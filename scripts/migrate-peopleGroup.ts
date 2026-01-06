/**
 * Script de migración para convertir el campo peopleGroup de string a array
 * 
 * Ejecutar con: npx sanity exec scripts/migrate-peopleGroup.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function migratePeopleGroup() {
  console.log('Iniciando migración de peopleGroup de string a array...')

  // Buscar todos los documentos company con peopleGroup como string
  const query = `*[_type == "company" && defined(peopleGroup) && !(peopleGroup match "*[*]*")] {
    _id,
    _rev,
    peopleGroup
  }`

  const documents = await client.fetch(query)
  console.log(`Encontrados ${documents.length} documentos para migrar`)

  let migrated = 0
  let errors = 0

  for (const doc of documents) {
    try {
      // Convertir string a array
      const peopleGroupArray = typeof doc.peopleGroup === 'string' 
        ? [doc.peopleGroup] 
        : doc.peopleGroup

      // Actualizar el documento
      await client
        .patch(doc._id)
        .set({peopleGroup: peopleGroupArray})
        .commit()

      console.log(`✓ Migrado documento ${doc._id}: "${doc.peopleGroup}" -> [${JSON.stringify(peopleGroupArray)}]`)
      migrated++
    } catch (error) {
      console.error(`✗ Error migrando documento ${doc._id}:`, error)
      errors++
    }
  }

  console.log(`\nMigración completada:`)
  console.log(`  - Documentos migrados: ${migrated}`)
  console.log(`  - Errores: ${errors}`)
}

migratePeopleGroup().catch((error) => {
  console.error('Error en la migración:', error)
  process.exit(1)
})

