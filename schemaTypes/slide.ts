import {defineField, defineType} from 'sanity'

export const slideType = defineType({
  name: 'slide',
  title: 'Slides',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: '(for sorting purposes)',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // Use 'text' for a multi-line description field
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      options: {
        hotspot: true, // Enables UI for cropping and focal point selection
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})