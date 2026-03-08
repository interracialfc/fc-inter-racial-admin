import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Enables UI for cropping and focal point
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}], // Enables the Rich Text editor
    }),
  ],
})
