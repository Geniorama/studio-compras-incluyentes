/**
 * Script de migración para agregar _key a los items del array favorites
 * que no tienen esta propiedad (requerida por Sanity para arrays).
 *
 * Ejecutar con: npx sanity exec scripts/migrate-favorites-keys.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'
import {randomUUID} from 'crypto'

const client = getCliClient()

function generateKey(): string {
  return randomUUID().replace(/-/g, '').slice(0, 12)
}

async function migrateFavoritesKeys() {
  console.log('Buscando usuarios con favoritos que tengan claves faltantes...')

  const query = `*[_type == "user" && count(favorites) > 0] {
    _id,
    favorites
  }`

  const users = await client.fetch(query)
  console.log(`Encontrados ${users.length} usuarios con favoritos`)

  let migrated = 0
  let errors = 0

  for (const user of users) {
    const favorites = user.favorites as Array<{_key?: string; _ref?: string; _type?: string}>
    if (!Array.isArray(favorites)) continue

    const needsMigration = favorites.some((item) => !item._key)
    if (!needsMigration) continue

    try {
      const updatedFavorites = favorites.map((item) => ({
        ...item,
        _key: item._key || generateKey(),
      }))

      await client.patch(user._id).set({favorites: updatedFavorites}).commit()

      console.log(`✓ Migrado usuario ${user._id}: agregadas ${favorites.filter((i) => !i._key).length} claves`)
      migrated++
    } catch (error) {
      console.error(`✗ Error migrando usuario ${user._id}:`, error)
      errors++
    }
  }

  console.log(`\nMigración completada:`)
  console.log(`  - Usuarios migrados: ${migrated}`)
  console.log(`  - Errores: ${errors}`)
}

migrateFavoritesKeys().catch((error) => {
  console.error('Error en la migración:', error)
  process.exit(1)
})
