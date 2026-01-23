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
      name: 'role',
      title: 'Rol',
      type: 'string',
      options: {
        list: [
          {title: 'Administrador', value: 'admin'}, 
          {title: 'Usuario', value: 'user'},
          {title: 'Director de compras', value: 'director-compras'},
          {title: 'Representante corporativo', value: 'representante-corporativo'},
          {title: 'Miembro', value: 'member'},
        ],
      },
      description: 'El rol "Miembro" no requiere autenticación ni se crea en Firebase. Solo se usa su información dentro de la compañía.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firebaseUid',
      title: 'Firebase UID',
      type: 'string',
      readOnly: true,
      description: 'Solo se crea para roles que requieren autenticación (no aplica para el rol "Miembro").',
      hidden: ({document}) => document?.role === 'member',
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
      name: 'dataTreatmentConsent',
      title: 'Aceptación de tratamiento de datos personales',
      type: 'boolean',
      description: 'Debes aceptar el tratamiento de tus datos personales para registrarte.',
      validation: (Rule) => Rule.custom((value, context) => {
        const role = context.document?.role;
        // El rol "member" no requiere consentimiento ya que no inicia sesión
        if (role === 'member') {
          return true;
        }
        return value === true ? true : 'Debes aceptar el tratamiento de datos personales';
      }),
    }),
    defineField({
      name: 'infoVisibilityConsent',
      title: 'Autorización de visibilidad de información',
      type: 'boolean',
      description: 'Autorizo que mi información sea visible en la plataforma para otros usuarios y empresas.',
      validation: (Rule) => Rule.custom((value, context) => {
        const role = context.document?.role;
        // El rol "member" no requiere consentimiento ya que no inicia sesión
        if (role === 'member') {
          return true;
        }
        return value === true ? true : 'Debes autorizar la visibilidad de tu información para continuar';
      }),
    }),
    defineField({
      name: 'publicProfile',
      title: 'Perfil público',
      type: 'boolean',
      description: 'Activa esta opción para que tu perfil sea visible públicamente en la plataforma.',
      initialValue: false,
    }),
    // Notas internas
    defineField({
      name: 'internalNotes',
      title: 'Notas internas',
      type: 'text',
      description: 'Notas internas para uso administrativo. No son visibles para el usuario.',
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