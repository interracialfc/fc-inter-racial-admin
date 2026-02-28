import { defineField, defineType } from 'sanity';
import {BasketIcon} from '@sanity/icons'

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'date',
      description: '(for sorting purposes)',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),
    defineField({
      name: 'slug',
      title: 'Permalink',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Kits', value: 'kits' },
          { title: 'Apparel', value: 'apparel' },
          { title: 'Accessories', value: 'accessories' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'price',
      title: 'Price (PHP)',
      type: 'number',
      description: 'Set to 0 if not yet priced.',
    }),
    defineField({
      name: 'status',
      title: 'Launch Status',
      type: 'string',
      initialValue: 'coming-soon',
      options: {
        list: [
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Made to Order', value: 'made-to-order' },
          { title: 'On Sale', value: 'on-sale' },
          { title: 'Sold Out', value: 'sold-out' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'button',
      title: 'Buy Button',
      type: 'string',
      initialValue: 'Message us to Order',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Buy Link',
      type: 'string',
      description: 'We could hook this up with Shopee (leave empty to disable button)',
    }),
  ],
});