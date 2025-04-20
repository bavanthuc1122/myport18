// @ts-ignore - Avoid TypeScript errors
type ConfigType = any;
const defineConfig = (config: ConfigType) => config;

// Mock imports
const structureTool = (config: any) => ({ ...config, type: 'structure' });
const visionTool = () => ({ type: 'vision' });
const media = () => ({ type: 'media' });
const colorInput = () => ({ type: 'color' });

// Import local modules
import {schemaTypes} from './schemaTypes'
import {myStructure} from './deskStructure'

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
