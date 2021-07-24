import { defineClientAppEnhance } from '@vuepress/client'

// import Example from './components/Example.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // app.component('MyComponent', Example)

  if (typeof window !== 'undefined') {
    import('vue-google-adsense')
      .then((module) => {
        const ads = module.default
        app.use(ads.Adsense)

        // 記事内広告
        app.use(ads.InArticleAdsense)

        // フィード内広告
        app.use(ads.InFeedAdsense)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  router.beforeEach((to) => {
    // console.log('Before navigation')
  })

  router.afterEach((to) => {
    // console.log('After navigation')
  })
})
