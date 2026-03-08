import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {DocumentTextIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'FC Inter Racial',

  projectId: '6mp6sm24',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About')
              .id('about')
              .icon(DocumentTextIcon)
              .child(S.document().schemaType('about').documentId('about')),

            // 3. List the rest of your types, BUT filter out 'about'
            // so it doesn't show up in the default list again
            ...S.documentTypeListItems().filter(
              (listItem) => !['about'].includes(listItem.getId() as string),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      return context.schemaType === 'about'
        ? prev.filter((action) =>
            ['publish', 'discardChanges', 'restore'].includes(action.action as string),
          )
        : prev
    },
  },
})
