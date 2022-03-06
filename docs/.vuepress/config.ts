import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: `Hack React`,
  description: `ミートアップやハンズオンでご紹介のあった資料を中心に記録しています。`,
  head: [
    [
      `script`,
      {},
      `(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-7095980629133842", enable_page_level_ads: true });`
    ],
    [
      `script`,
      {
        async: true,
        src: `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
      }
    ]
  ],
  base: `/`,
  themeConfig: {
    repo: `jiyuujin/hack-react`,
    editLinks: false,
    docsDir: `docs`,
    navbar: [
      {
        text: `ハンズオン`,
        children: [
          `/handson/pokemon.md`,
          `/handson/liff_vite.md`,
          `/handson/liff_nextjs.md`,
          `/handson/tests.md`
        ]
      }
    ],
    sidebarDepth: 3,
    sidebar: {
      '/': [
        {
          text: `はじめに`,
          children: [
            `/`,
            `/handson/pokemon.md`,
            `/handson/liff_vite.md`,
            `/handson/liff_nextjs.md`,
            `/handson/tests.md`
          ]
        }
      ],
      '/handson/pokemon': [
        {
          text: `Pokemon アプリ`,
          children: [
            `/handson/pokemon.md`
          ]
        },
      ],
      '/handson/liff_vite': [
        {
          text: `Vite で LIFF アプリ`,
          children: [
            `/handson/liff_vite.md`
          ]
        }
      ],
      '/handson/liff_nextjs': [
        {
          text: `Next.js で LIFF アプリ`,
          children: [
            `/handson/liff_nextjs.md`
          ]
        }
      ],
      '/handson/tests': [
        {
          text: `ユニットテスト`,
          children: [
            `/handson/tests.md`
          ]
        }
      ]
    }
  },
  markdown: {
    toc: { level: [1, 2] }
  },
  extendsMarkdown: (md) => {
    md.use(require('@nekohack/markdown-it-link-preview'))
  }
})
