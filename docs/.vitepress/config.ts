export default {
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
          `/index.md`,
          `/handson/pokemon.md`,
          `/handson/liff_vite.md`,
          `/handson/liff_nextjs.md`,
          `/handson/tests.md`
        ]
      }
    ],
    sidebarDepth: 3,
    sidebar: [
      {
        text: `はじめに`,
        items: [
          { text: 'Pokemon アプリ', link: '/handson/pokemon.md' },
          { text: 'Vite で LIFF アプリ', link: '/handson/liff_vite.md' },
          { text: 'Next.js で LIFF アプリ', link: '/handson/liff_nextjs.md' },
          { text: 'ユニットテスト', link: '/handson/tests.md' }
        ]
      }
    ]
  },
  markdown: {
    toc: { level: [1, 2] },
    config: (md) => {
      md.use(require('@nekohack/markdown-it-link-preview'))
    }
  }
}
