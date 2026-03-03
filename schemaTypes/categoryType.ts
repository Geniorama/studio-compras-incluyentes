import { defineField, defineType } from 'sanity'

type CategoryType = 'product' | 'service'

export default defineType({
  name: 'category',
  title: 'Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen de la categoría',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'types',
      title: 'Tipos de categoría',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Producto', value: 'product' },
          { title: 'Servicio', value: 'service' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
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
      name: 'createdBy',
      title: 'Creado por',
      type: 'reference',
      to: [{type: 'user'}],
      description:
        'Usuario que creó este registro. Si está definido, la categoría fue creada por un Superadmin desde el panel de administración.',
      readOnly: true,
      options: {
        filter: 'role == "superadmin"',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      types: 'types',
      media: 'image',
    },
    prepare({ title, types, media }: { title: string; types: CategoryType[]; media: any }) {
      const typeLabels: Record<CategoryType, string> = {
        product: 'Producto',
        service: 'Servicio'
      }
      const formattedTypes = types?.map(type => typeLabels[type] || type).join(', ') || 'Sin tipo'
      return {
        title,
        subtitle: formattedTypes,
        media
      }
    }
  },
}) 