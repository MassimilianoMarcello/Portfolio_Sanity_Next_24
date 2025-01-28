import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { codeInput } from '@sanity/code-input';

export default defineConfig({
  name: 'default',
  title: 'Portfolio_Sanity_Next_Sass',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  basePath: process.env.NEXT_PUBLIC_SANITY_BASE_PATH,
  plugins: [structureTool(), visionTool(),codeInput()],

  schema: {
    types: schemaTypes,
  },
})

