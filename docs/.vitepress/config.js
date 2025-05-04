// docs/.vitepress/config.js
export default {
    base: '/docs/',
    title: 'Omniface Vue Boilerplate', // Site title
    description: 'Documentation for Omniface, Warp CLI, and useApi', // Meta description
    head: [
        ['link', { rel: 'icon', href: '../public/favicon.ico' }],
        ['meta', { property: 'og:description', content: 'Complete docs for Omniface, Warp CLI, and useApi composable' }],
        ['meta', { property: 'og:url', content: 'https://yourdomain.com/docs/' }],
        ['meta', { property: 'og:image', content: '/docs/social-preview.png' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:creator', content: '@yourhandle' }],
    ],

    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Omnigrid', link: '/omnigrid/' },
            { text: 'Warp CLI', link: '/warp-cli/' },
            { text: 'useApi', link: '/use-api/' }
        ],
        sidebar: {
            '/omnigrid/': [
                { text: 'Overview', link: '/omnigrid/' },
                { text: 'Usage', link: '/omnigrid/usage' },
                { text: 'Examples', link: '/omnigrid/examples' }
            ],
            '/warp-cli/': [
                { text: 'Introduction', link: '/warp-cli/' },
                { text: 'Commands', link: '/warp-cli/commands' },
                { text: 'Code Generation', link: '/warp-cli/codegen' }
            ],
            '/use-api/': [
                { text: 'Getting Started', link: '/use-api/' },
                { text: 'Methods', link: '/use-api/methods' },
                { text: 'Error Handling', link: '/use-api/error-handling' }
            ]
        },
        search: {
            provider: 'local', // Enables client-side search
            options: {
                placeholder: 'Search docs...',
                miniLength: 2
            }
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/yourusername/omniface' },
            { icon: 'twitter', link: 'https://twitter.com/yourhandle' },
            { icon: 'discord', link: 'https://discord.gg/yourinvite' }
          ],
        footer: {
            message: 'Released under the MIT License',
            copyright: `Copyright © ${new Date().getFullYear()} Omniface`
          }
    }
}