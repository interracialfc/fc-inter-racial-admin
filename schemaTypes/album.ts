import { defineField, defineType } from 'sanity';
import {ImageIcon} from '@sanity/icons'

export const albumType = defineType({
  name: 'album',
  title: 'Albums',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      type: 'text',
    }),
    defineField({
      name: 'slug',
      title: 'Permalink',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error('An album needs at least one image.'),
    }),
  ],
});