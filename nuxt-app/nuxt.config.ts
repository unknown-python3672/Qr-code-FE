// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'QR Code Generator',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Generate a QR code in seconds for any URL.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/myfavicon.jpg' },
      ],
    },
  },
})