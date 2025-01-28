import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { codeInput } from '@sanity/code-input';

export default defineConfig({
  name: 'default',
  title: 'Portfolio_Sanity_Next_Sass',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qpv8frw8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: process.env.NEXT_PUBLIC_SANITY_BASE_PATH || '/studio',
  plugins: [structureTool(), visionTool(),codeInput()],

  schema: {
    types: schemaTypes,
  },
})

