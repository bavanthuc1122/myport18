import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Của Tôi',

  projectId: '8ucvng19',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Home Page Group
            S.listItem()
              .title('Trang Chủ')
              .child(
                S.list()
                  .title('Các Phần Trang Chủ')
                  .items([
                    S.documentListItem()
                      .title('Phần Hero')
                      .schemaType('heroSection')
                      .id('heroSection'),
                    S.documentListItem()
                      .title('Xem Trước Portfolio')
                      .schemaType('portfolioPreview')
                      .id('portfolioPreview'),
                    S.documentListItem()
                      .title('Phần Giới Thiệu')
                      .schemaType('aboutSection')
                      .id('aboutSection'),
                  ])
              ),

            // Portfolio Group
            S.listItem()
              .title('Dự Án')
              .child(
                S.list()
                  .title('Dự Án')
                  .items([
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
                    orderableDocumentListDeskItem({
                      type: 'btsSection',
                      title: 'Các Phần Hậu Trường',
                      S,
                      context,
                      icon: () => '📸',
                    }),
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
                      .id('contactInfo')
                      .child(
                        S.editor()
                          .id('contactInfo')
                          .schemaType('contactInfo')
                          .documentId('contactInfo')
                      ),
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
    // Sử dụng cấu hình mặc định cho image sources
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/32';
              }}
            />
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Portfolio Của Tôi</span>
          </div>
        );
      },
    },
  },
})
