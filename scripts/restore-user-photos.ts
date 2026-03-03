/**
 * Restaura las fotos de usuario eliminadas usando la History API de Sanity.
 * Funciona si el script fix-photo-type-mismatch borró fotos por error.
 *
 * Requisitos: historial disponible (Free: 3 días, Growth: 90 días, Enterprise: 365 días)
 *
 * Ejecutar: npx sanity exec scripts/restore-user-photos.ts --with-user-token
 *
 * Opcional: pasar horas hacia atrás para buscar (default: 48)
 *   npx sanity exec scripts/restore-user-photos.ts --with-user-token -- 72
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const config = client.config() as {projectId: string; dataset: string; token?: string}

const PROJECT_ID = config.projectId || 'rr3ptdu1'
const DATASET = config.dataset || 'production'
const API_VERSION = 'v2025-02-19'
const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}`

async function fetchDocumentAtTime(
  docId: string,
  time: string,
  token: string
): Promise<{documents?: Array<{photo?: unknown}>} | null> {
  const url = `${BASE_URL}/data/history/${DATASET}/documents/${encodeURIComponent(docId)}?time=${encodeURIComponent(time)}`
  const res = await fetch(url, {
    headers: {Authorization: `Bearer ${token}`},
  })
  if (!res.ok) return null
  return res.json()
}

function isValidPhoto(photo: unknown): boolean {
  if (!photo || typeof photo !== 'object') return false
  const obj = photo as {_type?: string}
  return obj._type === 'image'
}

async function restoreUserPhotos() {
  const token = config.token || process.env.SANITY_AUTH_TOKEN
  if (!token) {
    console.error('❌ Se necesita token de autenticación.')
    console.error('   Ejecuta con: npx sanity exec scripts/restore-user-photos.ts --with-user-token')
    console.error('   O define SANITY_AUTH_TOKEN en el entorno.')
    process.exit(1)
  }

  const hoursBack = parseInt(process.argv[2] || '48', 10)
  const searchTime = new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString()

  console.log('Buscando usuarios sin foto para restaurar desde el historial...')
  console.log(`  Buscando en: ${searchTime} (hace ~${hoursBack}h)\n`)

  const usersWithoutPhoto = await client.fetch<Array<{_id: string}>>(
    `*[_type == "user" && !(_id in path("drafts.**")) && !defined(photo)]{_id}`
  )

  if (usersWithoutPhoto.length === 0) {
    console.log('✓ No hay usuarios sin foto que restaurar.')
    return
  }

  console.log(`Encontrados ${usersWithoutPhoto.length} usuario(s) sin foto. Intentando restaurar...\n`)

  let restored = 0
  let errors = 0

  for (const user of usersWithoutPhoto) {
    const docId = user._id
    try {
      // Probar 24h, 48h y 72h atrás (dentro del límite de hoursBack)
      const offsets = [24, 48, 72].filter((h) => h <= hoursBack)
      let photo: unknown = null

      for (const h of offsets) {
        const t = new Date(Date.now() - h * 60 * 60 * 1000).toISOString()
        const historyData = await fetchDocumentAtTime(docId, t, token)
        const prevDoc = historyData?.documents?.[0]
        if (prevDoc && isValidPhoto(prevDoc.photo)) {
          photo = prevDoc.photo
          break
        }
      }
      if (!photo && offsets.length > 0) {
        const historyData = await fetchDocumentAtTime(docId, searchTime, token)
        const prevDoc = historyData?.documents?.[0]
        if (prevDoc?.photo && isValidPhoto(prevDoc.photo)) photo = prevDoc.photo
      }

      if (photo) {
        await client.patch(docId).set({photo}).commit()
        console.log(`✓ Restaurado: ${docId}`)
        restored++
      }
    } catch (error) {
      console.error(`✗ Error en ${docId}:`, error)
      errors++
    }
  }

  console.log(`\nCompletado: ${restored} restaurados, ${errors} errores.`)
  if (restored === 0 && usersWithoutPhoto.length > 0) {
    console.log('\n💡 Si no se restauró nada, prueba con más horas:')
    console.log('   npx sanity exec scripts/restore-user-photos.ts --with-user-token -- 168')
    console.log('   (168 = 7 días atrás)')
  }
}

restoreUserPhotos().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
