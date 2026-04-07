import { defineSEO } from 'indxel'

export default defineSEO({
  siteName: 'Kado',
  siteUrl: 'https://kado-box.fr',
  titleTemplate: '%s | Kado',
  defaultDescription: 'Comparatifs honnêtes, avis détaillés et codes promo exclusifs sur toutes les box beauté en France.',
  defaultOGImage: '/og-image.jpg',
  locale: 'fr_FR',
  twitter: {
    handle: '@kado_box',
    cardType: 'summary_large_image',
  },
})
