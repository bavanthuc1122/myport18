import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'
import {media} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'
import React from 'react'
import {myStructure} from './sanity/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Của Tôi',

  projectId: '8ucvng19',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: myStructure
    }),
    visionTool(),
    media(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    // Sử dụng cấu hình mặc định cho image
  },

  studio: {
    components: {
      logo: () => {
        const style = {
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem'
        }

        const imgStyle = {
          height: '2rem'
        }

        const textStyle = {
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }

        return React.createElement('div', { style },
          React.createElement('img', {
            src: 'https://via.placeholder.com/32',
            alt: 'Logo',
            style: imgStyle
          }),
          React.createElement('span', { style: textStyle }, 'Portfolio Của Tôi')
        )
      }
    },
  },
})
