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
      description: 'Opcional para Superadmin. Requerido para el resto de roles.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'superadmin') return true
          return value ? true : 'La empresa es requerida'
        }),
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
      description: 'Opcional para Superadmin.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'superadmin') return true
          return value ? true : 'El cargo es requerido'
        }),
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
      description: 'Opcional para Superadmin.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'superadmin') return true
          return value ? true : 'El teléfono es requerido'
        }),
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
      description: 'Opcional para Superadmin.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'superadmin') return true
          return value ? true : 'El tipo de documento es requerido'
        }),
    }),
    defineField({
      name: 'numDocument',
      title: 'Número de documento personal',
      type: 'string',
      description: 'Opcional para Superadmin.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'superadmin') return true
          return value ? true : 'El número de documento es requerido'
        }),
    }),
    defineField({
      name: 'photo',
      title: 'Foto de perfil',
      type: 'image',
      readOnly: false,
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
          {title: 'Super Administrador', value: 'superadmin'},
          {title: 'Administrador', value: 'admin'}, 
          {title: 'Usuario', value: 'user'},
          {title: 'Director de compras', value: 'director-compras'},
          {title: 'Representante corporativo', value: 'representante-corporativo'},
          {title: 'Miembro', value: 'member'},
        ],
      },
      description:
        'Superadmin: acceso al panel de administración global. Requiere firstName, lastName, email y firebaseUid. El rol "Miembro" no requiere autenticación ni se crea en Firebase.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firebaseUid',
      title: 'Firebase UID',
      type: 'string',
      description:
        'Solo se crea para roles que requieren autenticación (no aplica para el rol "Miembro"). Los administradores pueden editarlo para corregir sincronización. Requerido para Superadmin.',
      hidden: ({document}) => document?.role === 'member',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'member') return true
          if (role === 'superadmin') {
            return value ? true : 'Firebase UID es requerido para Superadmin (debe coincidir con el usuario en Firebase Auth)'
          }
          return true
        }),
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
    defineField({
      name: 'favorites',
      title: 'Usuarios favoritos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
          options: {
            filter: ({document}) => {
              if (!document?._id) {
                return {filter: 'publicProfile == true', params: {}}
              }
              return {
                filter: 'publicProfile == true && _id != $currentId',
                params: {currentId: document._id},
              }
            },
          },
        },
      ],
      description:
        'Usuarios que has marcado como favoritos. Solo puedes agregar usuarios con perfil público. Podrás ver tu lista de favoritos en la plataforma.',
      validation: (Rule) =>
        Rule.custom((favorites) => {
          if (!Array.isArray(favorites)) return true
          const ids = (favorites as Array<{_ref?: string}>)
            .map((ref) => ref?._ref)
            .filter((id): id is string => Boolean(id))
          const unique = new Set(ids)
          if (ids.length !== unique.size) {
            return 'No puedes agregar al mismo usuario más de una vez'
          }
          return true
        }),
    }),

    // notifyEmailMessages 
    defineField({
      name: 'notifyEmailMessages',
      title: 'Notificar mensajes por correo electrónico',
      type: 'boolean',
      description: 'Notificar mensajes por correo electrónico.',
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