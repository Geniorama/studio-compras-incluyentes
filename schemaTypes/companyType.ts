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
      name: 'description',
      title: 'Descripción de la empresa',
      type: 'text',
      description: 'Descripción general de la empresa, sus servicios, productos y valores.',
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
      name: 'chamberOfCommerce',
      title: 'Cámara de comercio',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'chamberOfCommerceValidated',
      title: 'Estado de validación - Cámara de comercio',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pendiente' },
          { title: 'En progreso', value: 'en-progreso' },
          { title: 'Válido', value: 'valido' },
          { title: 'Inválido', value: 'invalido' },
        ],
      },
      initialValue: 'pendiente',
      description: 'Estado de validación del documento de Cámara de comercio',
    }),
    defineField({
      name: 'chamberOfCommerceComments',
      title: 'Comentarios - Cámara de comercio',
      type: 'text',
      description: 'Comentarios sobre la validación del documento de Cámara de comercio',
    }),
    defineField({
      name: 'taxIdentificationDocument',
      title: 'Documento de identificación tributaria',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'taxIdentificationDocumentValidated',
      title: 'Estado de validación - Documento de identificación tributaria',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pendiente' },
          { title: 'En progreso', value: 'en-progreso' },
          { title: 'Válido', value: 'valido' },
          { title: 'Inválido', value: 'invalido' },
        ],
      },
      initialValue: 'pendiente',
      description: 'Estado de validación del documento de identificación tributaria',
    }),
    defineField({
      name: 'taxIdentificationDocumentComments',
      title: 'Comentarios - Documento de identificación tributaria',
      type: 'text',
      description: 'Comentarios sobre la validación del documento de identificación tributaria',
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
      name: 'department',
      title: 'Departamento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'País',
      type: 'string',
      // Formato ISO 3166-1 alpha-2
      options: {
        list: [
          { title: 'Argentina', value: 'AR' },
          { title: 'Bolivia', value: 'BO' },
          { title: 'Brasil', value: 'BR' },
          { title: 'Chile', value: 'CL' },
          { title: 'Colombia', value: 'CO' },
          { title: 'Costa Rica', value: 'CR' },
          { title: 'Cuba', value: 'CU' },
          { title: 'República Dominicana', value: 'DO' },
          { title: 'Ecuador', value: 'EC' },
          { title: 'El Salvador', value: 'SV' },
          { title: 'Guatemala', value: 'GT' },
          { title: 'Haití', value: 'HT' },
          { title: 'Honduras', value: 'HN' },
          { title: 'México', value: 'MX' },
          { title: 'Nicaragua', value: 'NI' },
          { title: 'Panamá', value: 'PA' },
          { title: 'Paraguay', value: 'PY' },
          { title: 'Perú', value: 'PE' },
          { title: 'Puerto Rico', value: 'PR' },
          { title: 'Uruguay', value: 'UY' },
          { title: 'Venezuela', value: 'VE' },
        ],
      },
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
    defineField({
      name: 'companySize',
      title: 'Tamaño de la empresa',
      type: 'string',
      options: {
        list: [
          { title: 'Micro', value: 'micro' },
          { title: 'Pequeña', value: 'pequena' },
          { title: 'Mediana', value: 'mediana' },
          { title: 'Grande', value: 'grande' },
          { title: 'Indefinido', value: 'indefinido' },
        ],
      },
      initialValue: 'micro',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'peopleGroup',
      title: 'Grupo poblacional',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'LGBTIQ+', value: 'lgbtiq' },
          { title: 'Personas con discapacidad Sensorial', value: 'discapacidad-sensorial' },
          { title: 'Personas con discapacidad Físico Motora', value: 'discapacidad-fisico-motora' },
          { title: 'Personas con discapacidad Psicosocial', value: 'discapacidad-psicosocial' },
          { title: 'Personas con discapacidad Cognitiva', value: 'discapacidad-cognitiva' },
          { title: 'Migrantes', value: 'migrantes' },
          { title: 'Etnia y Raza: Afrodescendientes, raizales y palenqueros', value: 'etnia-afrodescendientes' },
          { title: 'Etnia y Raza: Indígenas', value: 'etnia-indigenas' },
          { title: 'Víctimas de reconciliación y paz (víctimas, victimarios)', value: 'victimas-reconciliacion-paz' },
          { title: 'Pospenadas', value: 'pospenadas' },
          { title: 'Diversidad Generacional mayores de 50 años', value: 'diversidad-generacional-mayores-50' },
          { title: 'Diversidad Generacional primer empleo', value: 'diversidad-generacional-primer-empleo' },
          { title: 'Madres cabeza de familia', value: 'madres-cabeza-familia' },
          { title: 'Diversidad Sexual', value: 'diversidad-sexual' },
          { title: 'Personas con discapacidad', value: 'personas-discapacidad' },
          { title: 'Etnia, raza o afro', value: 'etnia-raza-afro' },
          { title: 'Personas migrantes', value: 'personas-migrantes' },
          { title: 'Generacional', value: 'generacional' },
          { title: 'Equidad de Género', value: 'equidad-genero' },
          { title: 'Pospenados o reinsertados', value: 'pospenados-reinsertados' },
          { title: 'Ninguno', value: 'ninguno' },
          { title: 'Otro', value: 'otro' },
        ],
      },
    }),
    defineField({
      name: 'otherPeopleGroup',
      title: 'Especificar otro grupo poblacional',
      type: 'string',
      hidden: ({document}) => {
        const peopleGroup = document?.peopleGroup;
        return !Array.isArray(peopleGroup) || !peopleGroup.includes('otro');
      },
      validation: (Rule) => Rule.custom((value, context) => {
        const peopleGroup = context.document?.peopleGroup;
        if (Array.isArray(peopleGroup) && peopleGroup.includes('otro') && !value) {
          return 'Debe especificar el grupo poblacional cuando selecciona "Otro"';
        }
        return true;
      }),
    }),
    // Campo para activar/desactivar la empresa
    defineField({
      name: 'active',
      title: 'Empresa activa',
      type: 'boolean',
      initialValue: false,
      description: 'Marca esta casilla para activar la empresa y permitir el acceso de sus usuarios.',
    }),

    defineField({
      name: 'friendlyBizz',
      title: '¿La empresa está certificada con el sello Friendly Bizz?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'membership',
      title: '¿Tienes una membresía activa?',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
    }),

    // Boolean inclusión DEI
    defineField({
      name: 'inclusionDEI',
      title: 'Empresa comprometida con la equidad e inclusión DEI',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'diverseSupplier',
      title: 'Proveedora Diversa',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      // annual revenue
      name: 'annualRevenue',
      title: 'Ingresos anuales',
      type: 'number',
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
    // Notas internas
    defineField({
      name: 'internalNotes',
      title: 'Notas internas',
      type: 'text',
      description: 'Notas internas para uso administrativo. No son visibles públicamente.',
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
    defineField({
      name: 'createdBy',
      title: 'Creado por',
      type: 'reference',
      to: [{type: 'user'}],
      description:
        'Usuario que creó este registro. Si está definido, la empresa fue creada por un Superadmin desde el panel de administración.',
      readOnly: true,
      options: {
        filter: 'role == "superadmin"',
      },
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