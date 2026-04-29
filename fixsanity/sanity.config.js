import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'
// import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import React from 'react'

// Cấu hình mặc định cho Sanity Studio
export const defaultConfig = defineConfig({
  name: 'default',
  title: 'Portfolio Của Tôi',

  projectId: '8ucvng19',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) => {
        return S.list()
          .title('Content')
          .items([
            // Home Page Group
            S.listItem()
              .title('Trang Chủ')
              .child(
                S.list()
                  .title('Trang Chủ - quản lý theo session')
                  .items([
                    S.documentListItem()
                      .title('Home Page Sessions - rõ từng ảnh')
                      .schemaType('homePageSessions')
                      .id('homePageSessions'),
                    S.divider(),
                    S.documentListItem()
                      .title('Legacy - Hero cũ')
                      .schemaType('heroSection')
                      .id('heroSection'),
                    S.documentListItem()
                      .title('Legacy - Portfolio Preview cũ')
                      .schemaType('portfolioPreview')
                      .id('portfolioPreview'),
                    S.documentListItem()
                      .title('Legacy - About cũ')
                      .schemaType('aboutSection')
                      .id('aboutSection'),

                    S.documentListItem()
                      .title('Legacy - Contact / CTA cũ')
                      .schemaType('ctaSection')
                      .id('ctaSection'),
                  ])
              ),

            // Portfolio Group
            S.listItem()
              .title('Dự Án')
              .child(
                S.list()
                  .title('Dự Án')
                  .items([
                    S.documentTypeListItem('category')
                      .title('Danh Mục'),
                    S.documentTypeListItem('portfolioItem')
                      .title('Các Dự Án'),
                  ])
              ),

            // BTS Group
            S.listItem()
              .title('Hậu Trường')
              .child(
                S.list()
                  .title('Hậu Trường')
                  .items([
                    S.documentTypeListItem('btsSection')
                      .title('Các Phần Hậu Trường'),
                  ])
              ),

            // Contact Group
            S.listItem()
              .title('Liên Hệ')
              .child(
                S.list()
                  .title('Liên Hệ')
                  .items([
                    S.documentListItem()
                      .title('Thông Tin Liên Hệ')
                      .schemaType('contactInfo')
                      .id('contactInfo'),
                  ])
              ),
          ])
      },
    }),
    visionTool(),
    media(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    // Cấu hình cho upload file lớn (video)
    file: {
      // Tăng kích thước tối đa lên 100MB (giá trị tính bằng byte)
      assetSources: (previousAssetSources) => {
        return previousAssetSources.map(assetSource => {
          if (assetSource.name === 'sanity-default') {
            return {
              ...assetSource,
              options: {
                ...assetSource.options,
                // 100MB = 100 * 1024 * 1024 bytes
                maxFileSize: 100 * 1024 * 1024,
              },
            };
          }
          return assetSource;
        });
      },
    },
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

// Export cấu hình mặc định cho Sanity Studio
export default defaultConfig
