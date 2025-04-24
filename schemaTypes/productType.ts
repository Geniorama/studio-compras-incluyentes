import {defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Productos',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'Usuario',
      type: 'reference',
      to: [{type: 'user'}],
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
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Tecnología', value: 'tecnologia'},
          {title: 'Hogar', value: 'hogar'},
          {title: 'Oficina', value: 'oficina'},
        ],
      },
      validation: (Rule) => Rule.required(),
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
  ],
})
