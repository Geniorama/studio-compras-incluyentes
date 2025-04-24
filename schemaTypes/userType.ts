import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'user',
  title: 'Usuarios',
  type: 'document',
  fields: [
    // Información de la empresa
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

    // Información personal
    defineField({
      name: 'firstName',
      title: 'Nombre(s)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Apellido(s)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pronoun',
      title: 'Pronombre',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Cargo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Número de teléfono',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'typeDocument',
      title: 'Tipo de documento personal',
      type: 'string',
      options: {
        list: [
          { title: 'Cédula de Ciudadanía', value: 'cc' },
          { title: 'Cédula de Extranjería', value: 'ce' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'numDocument',
      title: 'Número de documento personal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto de perfil',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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

    // Información de autenticación
    defineField({
      name: 'firebaseUid',
      title: 'Firebase UID',
      type: 'string',
      readOnly: true,
    }),
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
      subtitle: 'email',
      media: 'logo',
    },
  },
})