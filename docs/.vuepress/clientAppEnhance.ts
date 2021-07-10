import { defineClientAppEnhance } from '@vuepress/client'

// import Example from './components/Example.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // app.component('MyComponent', Example)

  router.beforeEach((to) => {
    // console.log('Before navigation')
  })

  router.afterEach((to) => {
    // console.log('After navigation')
  })
})
