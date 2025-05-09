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
        validation: Rule => Rule.required()
      },
      {
        name: 'receiver',
        title: 'Destinatario',
        type: 'reference',
        to: [{ type: 'user' }],
        validation: Rule => Rule.required()
      },
      {
        name: 'createdAt',
        title: 'Fecha de envío',
        type: 'datetime',
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
        receiver: 'receiver.firstName',
        subject: 'subject',
        content: 'content'
      },
      prepare(selection: any) {
        const {sender, receiver, subject, content} = selection;
        return {
          title: subject || content?.substring(0, 50) + '...',
          subtitle: `De: ${sender || 'N/A'} → Para: ${receiver || 'N/A'}`
        };
      }
  },
})
