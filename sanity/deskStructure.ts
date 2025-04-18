import {StructureBuilder} from 'sanity/desk'

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Home Group
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page Sections')
            .items([
              S.listItem()
                .title('Hero Section')
                .child(S.documentTypeList('heroSection')),
              S.listItem()
                .title('About Us Section')
                .child(S.documentTypeList('aboutSection')),
              S.listItem()
                .title('Portfolio Preview')
                .child(S.documentTypeList('portfolioPreview')),
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
