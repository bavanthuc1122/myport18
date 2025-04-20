// @ts-ignore
type StructureBuilder = any

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Home Group
      S.listItem()
        .title('Các phần trang chủ')
        .child(
          S.list()
            .title('Các phần trang chủ')
            .items([
              // Hero Section
              S.listItem()
                .title('Hero Section')
                .child(
                  S.document()
                    .documentId('heroSection')
                    .schemaType('heroSection')
                ),
              // About Us Section
              S.listItem()
                .title('About Section')
                .child(
                  S.document()
                    .documentId('aboutSection')
                    .schemaType('aboutSection')
                ),
              // Portfolio Preview
              S.listItem()
                .title('Portfolio Preview')
                .child(
                  S.document()
                    .documentId('portfolioPreview')
                    .schemaType('portfolioPreview')
                ),
            ])
        ),

      // Portfolio Group
      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category')),
              S.listItem()
                .title('Portfolio Items')
                .child(S.documentTypeList('portfolioItem')),
            ])
        ),

      // BTS Group
      S.listItem()
        .title('Behind The Scenes')
        .child(
          S.list()
            .title('Behind The Scenes')
            .items([
              S.listItem()
                .title('BTS Sections')
                .child(S.documentTypeList('btsSection')),
            ])
        ),

      // Contact Group
      S.listItem()
        .title('Contact')
        .child(S.documentTypeList('contactInfo')),
    ])
