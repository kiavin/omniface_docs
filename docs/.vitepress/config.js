// docs/.vitepress/config.js
export default {
    base: '/omniface-docs/',
    title: 'Omniface Docs',
    description: 'Documentation for Omniface, Warp CLI, and useApi',
    
    // Updated head configuration with correct paths
    head: [
      ['link', { rel: 'icon', href: '/docs/favicon.ico', type: 'image/x-icon' }],
      ['meta', { property: 'og:title', content: 'Omniface Documentation' }],
      ['meta', { property: 'og:description', content: 'Complete docs for Omniface, Warp CLI, and useApi composable' }],
      ['meta', { property: 'og:url', content: 'https://yourdomain.com/docs/' }],
      ['meta', { property: 'og:image', content: '/docs/social-preview.png' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:creator', content: '@yourhandle' }],
      ['meta', { name: 'theme-color', content: '#4f46e5' }]
    ],
  
    // Updated theme configuration with working features
    themeConfig: {
      logo: '../public/favicon.ico', // Recommended SVG logo
      
      // Navigation
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Omnigrid', link: '/omnigrid/' },
        { text: 'Warp CLI', link: '/warp-cli/' },
        { text: 'useApi', link: '/use-api/' },
        { text: 'Roadmap', link: '/roadmap' }
      ],
  
      // Sidebar
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
          {
            text: 'useApi Composable',
            collapsible: true,
            items: [
              { text: 'Getting Started', link: '/use-api/' },
              { text: 'Methods', link: '/use-api/methods' },
              { text: 'Error Handling', link: '/use-api/error-handling' },
              { text: 'Advanced Patterns', link: '/use-api/advanced' }
            ]
          }
        ]
      },
  
      // Search
      search: {
        provider: 'local',
        options: {
          placeholder: 'Search docs...',
          miniLength: 2,
          translations: {
            button: {
              buttonText: 'Search',
              buttonAriaLabel: 'Search'
            }
          }
        }
      },
  
      // Social Links
      socialLinks: [
        { icon: 'github', link: 'https://github.com/Francis-Yuppie/' },
        { icon: 'twitter', link: 'https://twitter.com/yourhandle' },
        { icon: 'discord', link: 'https://discord.gg/yourinvite' }
      ],
  
      // Banner (requires custom CSS)
      banner: {
        text: '🚀 Omniface v2.0 is coming soon!',
        link: '/roadmap',
        dismissible: true,
        key: 'v2-announcement' // Required for dismissible
      },
  
      // Outline sidebar
      outline: {
        level: [2, 3],
        label: 'On this page',
        outlineBadges: true
      },
  
      // Doc footer navigation
      docFooter: {
        prev: '← Previous',
        next: 'Next →'
      },
  
      // Footer
      footer: {
        message: 'Released under the MIT License',
        copyright: `Copyright © ${new Date().getFullYear()} Omniface`
      },
  
      // Return to top
      returnToTop: true, // Changed from returnToTopLabel
  
      // Team section (requires custom component)
      team: [
        {
          avatar: '/docs/team/avatar1.jpg', // Updated path
          name: 'Francis Yuppie',
          title: 'Creator',
          links: [
            { icon: 'github', link: 'https://github.com/Francis-Yuppie' },
            { icon: 'twitter', link: 'https://twitter.com/francisyuppie' }
          ]
        }
      ],
  
      // Last updated
      lastUpdated: {
        text: 'Last updated',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium'
        }
      },
  
      // Edit link
      editLink: {
        pattern: 'https://github.com/Francis-Yuppie/omniface/edit/main/docs/:path',
        text: 'Edit this page on GitHub'
      }
    },
  
    // Custom theme enhancements
    markdown: {
      theme: {
        light: 'github-light',
        dark: 'github-dark'
      },
      lineNumbers: true
    }
  }