# Home Page Sessions Guide

Use the document **Home Page Sessions - rõ từng ảnh** as the new single source for homepage images and copy.

## Session 1 - Hero

Sanity path:

- `hero.backgroundImage`: full background image.
- `hero.featuredImage`: foreground/preview image in the hero grid.
- `hero.eyebrow`, `hero.title`, `hero.subtitle`: text content.

## Session 2 - Horizontal Showcase

Sanity path:

- `horizontalShowcase.backgroundImage`: full background behind the horizontal track.
- `horizontalShowcase.image1`: first image item.
- `horizontalShowcase.text1`: first text item.
- `horizontalShowcase.image2`: second image item.
- `horizontalShowcase.image3`: third image item.
- `horizontalShowcase.text2`: second text item.
- `horizontalShowcase.scrollHeight`: controls scroll speed, for example `300vh`, `350vh`, `400vh`.

Required layout order:

```txt
image | text | image | image | text
```

## Session 3 - Process

Sanity path:

- `process.backgroundImage`: full background.
- `process.copy`: eyebrow/title/description.
- `process.steps[]`: number/title/description rows.
- `process.images[]`: supporting images.

## Session 4 - Services

Sanity path:

- `services.backgroundImage`: full background.
- `services.copy`: eyebrow/title/description.
- `services.items[]`: service names.

## Session 5 - About

Sanity path:

- `about.backgroundImage`: full background.
- `about.portraitImage`: main portrait/image.
- `about.copy`: eyebrow/title/description.
- `about.featureCards[]`: three small feature labels.

## Session 6 - Contact

Sanity path:

- `contact.backgroundImage`: full background.
- `contact.copy`: eyebrow/title/description.
- `contact.buttonText`: CTA button text.
- `contact.buttonLink`: CTA link.
- `contact.supportingLines[]`: small supporting lines below the CTA.

## Legacy Documents

The old documents are still available under **Legacy - Các phần trang chủ cũ**:

- `Hero Section`
- `Portfolio Preview`
- `About Section`
- `ctaSection`

Keep them while migrating. After the frontend is updated to query `homePageSessions`, they can be hidden or removed later.
