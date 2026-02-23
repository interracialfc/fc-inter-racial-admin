import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons' // Optional: if you have sanity icons installed

export const playerType = defineType({
  name: 'player',
  title: 'Players',
  type: 'document',
  icon: UserIcon,
  fieldsets: [
    { name: 'social', title: 'Social Media Links' }
  ],
  fields: [
    // --- Basic Info ---
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Permalink',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        // Optional: ensures slugs are unique across all 'player' documents
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true, // Good for headshots to ensure faces aren't cut off
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'squadNumber',
      title: 'Squad Number',
      type: 'number',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Goalkeeper', value: 'GK'},
          {title: 'Defender', value: 'DF'},
          {title: 'Midfielder', value: 'MF'},
          {title: 'Forward', value: 'FW'},
          {title: 'Coaching', value: 'CH'},
        ],
      },
    }),

    // --- Personal Details ---
    defineField({
      name: 'dob',
      title: 'Date of Birth',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
    }),
    defineField({
      name: 'dateSigned',
      title: 'Date Signed',
      type: 'date',
    }),

    // --- Content & History ---
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array', 
      of: [{type: 'block'}] // Allows for rich text (bold, links, etc.)
    }),
    defineField({
      name: 'formerClubs',
      title: 'Former Clubs',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // --- Media ---
    defineField({
      name: 'gallery',
      title: 'Player Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', type: 'string', title: 'Caption' }]
        }
      ],
    }),

    // --- Socials ---
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      fieldset: 'social',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      fieldset: 'social',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'squadNumber',
      media: 'gallery.0', // Shows the first image of the gallery as the thumbnail
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `#${subtitle}` : 'No number assigned',
        media,
      }
    }
  },
})