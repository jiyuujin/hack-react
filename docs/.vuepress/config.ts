import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: `Hack React`,
  description: `ミートアップやハンズオンでご紹介のあった資料を中心に記録しています。`,
  head: [
    //
  ],
  base: `/`,
  themeConfig: {
    repo: `jiyuujin/hack-react`,
    editLinks: false,
    docsDir: `docs`,
    nav: [
      {
        text: `Pokemon アプリ`,
        link: `/handson/pokemon.md`,
      }
    ],
    sidebarDepth: 3,
    sidebar: {
      '/': [
        {
          text: `はじめに`,
          children: [
            `/`,
            `/handson/pokemon.md`
          ]
        }
      ],
      '/handson/': [
        {
          text: `Pokemon アプリ`,
          children: [
            `/handson/pokemon.md`
          ]
        }
      ]
    }
  }
})
