import {defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  fields: [
    {
        name: 'company',
        title: 'Empresa',
        type: 'reference',
        to: [{type: 'company'}],
        validation: Rule => Rule.required()
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
          {title: 'Consultoría', value: 'consultoria'},
          {title: 'Desarrollo', value: 'desarrollo'},
          {title: 'Diseño', value: 'diseno'},
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
      name: 'duration',
      title: 'Duración',
      type: 'string',
    },
    {
      name: 'modality',
      title: 'Modalidad',
      type: 'string',
      options: {
        list: [
          {title: 'Presencial', value: 'presencial'},
          {title: 'Virtual', value: 'virtual'},
          {title: 'Híbrido', value: 'hibrido'},
        ],
      },
    },
    {
      name: 'availability',
      title: 'Disponibilidad',
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
