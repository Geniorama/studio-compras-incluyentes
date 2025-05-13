import {defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Productos',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Empresa',
      type: 'reference',
      to: [{type: 'company'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Categorías',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'category' }] }
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          {title: 'Borrador', value: 'draft'},
          {title: 'Activo', value: 'active'},
          {title: 'Inactivo', value: 'inactive'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
    },
    // Campos de auditoría de usuario
    {
      name: 'createdBy',
      title: 'Creado por',
      type: 'reference',
      to: [{type: 'user'}],
      readOnly: true,
    },
    {
      name: 'updatedBy',
      title: 'Actualizado por',
      type: 'reference',
      to: [{type: 'user'}],
      readOnly: true,
    },
  ],
})
