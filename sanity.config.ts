import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { codeInput } from '@sanity/code-input';

export default defineConfig({
  name: 'default',
  title: 'Portfolio_Sanity_Next_Sass',
 projectId: 'qpv8frw8',
  dataset: 'production',
  basePath:"/studio",
  plugins: [structureTool(), visionTool(),codeInput()],

  schema: {
    types: schemaTypes,
  },
})
