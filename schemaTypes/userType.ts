import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'user',
  title: 'Usuarios',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'reference',
      to: [{type: 'company'}],
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
      // validation: (Rule) => Rule.required(),
    }),
    // Información de autenticación
    defineField({
      name: 'firebaseUid',
      title: 'Firebase UID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      options: {
        list: [{title: 'Administrador', value: 'admin'}, {title: 'Usuario', value: 'user'}],
      },
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'membership',
      title: '¿Tienes una membresía activa?',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
      description: 'Campo diligenciado por el usuario en el formulario de registro.',
    }),
    defineField({
      name: 'dataTreatmentConsent',
      title: 'Aceptación de tratamiento de datos personales',
      type: 'boolean',
      description: 'Debes aceptar el tratamiento de tus datos personales para registrarte.',
      validation: (Rule) => Rule.required().custom(value => value === true ? true : 'Debes aceptar el tratamiento de datos personales'),
    }),
    defineField({
      name: 'infoVisibilityConsent',
      title: 'Autorización de visibilidad de información',
      type: 'boolean',
      description: 'Autorizo que mi información sea visible en la plataforma para otros usuarios y empresas.',
      validation: (Rule) => Rule.required().custom(value => value === true ? true : 'Debes autorizar la visibilidad de tu información para continuar'),
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email',
      media: 'photo',
    },
  },
})