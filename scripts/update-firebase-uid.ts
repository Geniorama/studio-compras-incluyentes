/**
 * Script para actualizar el Firebase UID de un usuario vía API.
 * Bypasea las validaciones del Studio; útil cuando no puedes publicar desde la interfaz.
 *
 * Uso:
 *   npx sanity exec scripts/update-firebase-uid.ts --with-user-token -- <userId> <nuevoFirebaseUid>
 *
 * Ejemplo (userId = el ID del documento, sin prefijo "drafts."):
 *   npx sanity exec scripts/update-firebase-uid.ts --with-user-token -- user-abc123 xyz789
 *
 * Para listar usuarios y sus IDs:
 *   npx sanity exec scripts/update-firebase-uid.ts --with-user-token -- list
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const args = process.argv.slice(2)
const userId = args[0]
const newFirebaseUid = args[1]
const listOnly = userId === 'list'

async function updateFirebaseUid() {
  if (listOnly) {
    const users = await client.fetch(
      `*[_type == "user" && !(_id in path("drafts.**"))]{_id, "email": email, firebaseUid, "name": firstName + " " + lastName}`
    )
    console.log('Usuarios (usa _id como primer argumento):\n')
    users.forEach((u: {_id: string; email?: string; firebaseUid?: string; name?: string}) => {
      console.log(`  ${u._id}`)
      console.log(`    Email: ${u.email ?? '-'}, Firebase UID: ${u.firebaseUid ?? '-'}`)
    })
    return
  }

  if (!userId || !newFirebaseUid) {
    console.error('Uso: npx sanity exec scripts/update-firebase-uid.ts --with-user-token -- <userId> <nuevoFirebaseUid>')
    console.error('Ejemplo: npx sanity exec scripts/update-firebase-uid.ts --with-user-token -- user-abc123 xyz789')
    process.exit(1)
  }

  const docId = userId.startsWith('drafts.') ? userId.replace('drafts.', '') : userId

  try {
    await client.patch(docId).set({firebaseUid: newFirebaseUid}).commit()
    console.log(`✓ Firebase UID actualizado en documento publicado: ${docId}`)
    // Limpiar draft si existe para evitar conflictos al abrir en Studio
    const draftId = `drafts.${docId}`
    const draftExists = await client.fetch(`defined(*[_id == $id][0]._id)`, {id: draftId})
    if (draftExists) {
      await client.delete(draftId)
      console.log(`✓ Borrador eliminado para evitar conflictos`)
    }
  } catch (error) {
    console.error('✗ Error:', error)
    process.exit(1)
  }
}

updateFirebaseUid().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
