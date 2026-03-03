/**
 * Corrige usuarios con el campo `photo` guardado como string en lugar de image.
 * Este tipo de error ocurre cuando el esquema cambió o se importaron datos incorrectos.
 *
 * Ejecutar: npx sanity exec scripts/fix-photo-type-mismatch.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function fixPhotoTypeMismatch() {
  console.log('Buscando usuarios con photo inválido (string en lugar de image)...')

  // Sanity guarda images como { _type: 'image', asset: { _ref: '...' } }
  // Obtenemos usuarios con photo definido y filtramos en JS (GROQ no tiene type())
  const allWithPhoto = await client.fetch<Array<{_id: string; photo: unknown}>>(
    `*[_type == "user" && defined(photo)]{_id, photo}`
  )
  const users = allWithPhoto.filter((u) => {
    // Solo corregir cuando photo es string (el error que causa "Read only")
    // No tocar objetos que podrían ser imágenes válidas
    return typeof u.photo === 'string'
  })

  if (users.length === 0) {
    console.log('✓ No se encontraron usuarios con photo inválido.')
    return
  }

  console.log(`Encontrados ${users.length} usuario(s) con photo inválido. Corrigiendo...`)

  let fixed = 0
  for (const user of users) {
    try {
      // Unset photo para que sea undefined (válido para campo opcional)
      await client.patch(user._id).unset(['photo']).commit()
      console.log(`✓ Corregido: ${user._id}`)
      fixed++
    } catch (error) {
      console.error(`✗ Error en ${user._id}:`, error)
    }
  }

  console.log(`\nCompletado: ${fixed}/${users.length} usuarios corregidos.`)
}

fixPhotoTypeMismatch().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
