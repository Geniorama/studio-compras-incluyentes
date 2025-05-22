import {defineType} from 'sanity'

export default defineType({
  name: 'message',
  title: 'Mensajes',
  type: 'document',
  fields: [
    {
      name: 'subject',
      title: 'Asunto',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'sender',
      title: 'Remitente',
      type: 'reference',
      to: [{ type: 'user' }],
      // Puede ser opcional si el mensaje lo envía el sistema
    },
    {
      name: 'company',
      title: 'Empresa destinataria',
      type: 'reference',
      to: [{ type: 'company' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'createdAt',
      title: 'Fecha de envío',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    },
    {
      name: 'read',
      title: 'Leído',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'deleted',
      title: 'Eliminado',
      type: 'boolean',
      initialValue: false,
      hidden: true
    },
    {
      name: 'type',
      title: 'Tipo de mensaje',
      type: 'string',
      options: {
        list: [
          { title: 'Notificación', value: 'notification' },
          { title: 'Soporte', value: 'support' },
          { title: 'Alerta', value: 'alert' }
        ]
      }
    }
  ],
  orderings: [
    {
      title: 'Fecha de envío',
      name: 'createdAtDesc',
      by: [
        {field: 'createdAt', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      sender: 'sender.firstName',
      company: 'company.nameCompany',
      subject: 'subject',
      content: 'content'
    },
    prepare(selection) {
      const {sender, company, subject, content} = selection;
      return {
        title: subject || content?.substring(0, 50) + '...',
        subtitle: `De: ${sender || 'Sistema'} → Empresa: ${company || 'N/A'}`
      };
    }
  },
})