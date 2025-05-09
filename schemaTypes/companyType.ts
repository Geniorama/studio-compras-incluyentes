import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'company',
  title: 'Empresas',
  type: 'document',
  fields: [
    defineField({
      name: 'nameCompany',
      title: 'Nombre de la marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'businessName',
      title: 'Razón social',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'typeDocumentCompany',
      title: 'Tipo de documento empresa',
      type: 'string',
      options: {
        list: [
          { title: 'NIT', value: 'nit' },
          { title: 'Cédula de Ciudadanía', value: 'cc' },
          { title: 'Cédula de Extranjería', value: 'ce' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'numDocumentCompany',
      title: 'Número de documento empresa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ciiu',
      title: 'Código CIIU',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'webSite',
      title: 'Página Web',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addressCompany',
      title: 'Dirección de la empresa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo de la empresa',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Campo para activar/desactivar la empresa
    defineField({
      name: 'active',
      title: 'Empresa activa',
      type: 'boolean',
      initialValue: false,
      description: 'Marca esta casilla para activar la empresa y permitir el acceso de sus usuarios.',
    }),
    // Redes sociales
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'xtwitter',
      title: 'Twitter',
      type: 'url',
    }),
    // Campos de auditoría
    defineField({
      name: 'createdAt',
      title: 'Fecha de creación',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Fecha de actualización',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'nameCompany',
      subtitle: 'businessName',
      media: 'logo',
    },
  },
})