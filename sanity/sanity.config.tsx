import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './deskStructure'
import {media} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Photography Portfolio CMS',

  projectId: '8ucvng19',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure
    }),
    visionTool(),
    media(),
    colorInput()
  ],

  schema: {
    types: schemaTypes as any,
  },

  studio: {
    components: {
      logo: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: '2rem' }}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/32';
              }}
            />
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>My Portfolio</span>
          </div>
        );
      },
    },
  },
})
