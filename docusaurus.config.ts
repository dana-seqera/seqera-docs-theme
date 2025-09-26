import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import 'dotenv/config';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from '@docusaurus/types/src/plugin';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Seqera Docs Theme',
  tagline: 'Documentation for Seqera products',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: {
      useCssCascadeLayers: true,
    },
    experimental_faster: {
      swcJsLoader: false,
      swcJsMinimizer: false,
      swcHtmlMinimizer: false,
      lightningCssMinimizer: false,
      rspackBundler: false, // Switch back to Webpack
      mdxCrossCompilerCache: false,
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem', // Derived from docusaurus-theme-openapi
          remarkPlugins: [
            require('remark-code-import'),
            require('remark-math'),
            require('docusaurus-remark-plugin-tab-blocks'),
            require('remark-yaml-to-table'),
          ],
          rehypePlugins: [require('rehype-katex')],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          blogTitle: 'Seqera Changelog',
          blogDescription: 'Blog',
          blogSidebarCount: 5000,
          blogSidebarTitle: 'Changelog',
          path: 'changelog',
          routeBasePath: '/changelog',
          //processBlogPosts: () => ({}),
          include: ['**/*.{md,mdx}'],
          showReadingTime: false,
          feedOptions: {
            type: 'all', // 'rss', 'atom', or both
            title: 'Seqera Changelog',
            description: 'Stay updated with our blog posts!',
            copyright: `Copyright © ${new Date().getFullYear()} Seqera`,
          },
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/main.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/favicon--dynamic.svg',
    colorMode: {
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Seqera Docs',
      logo: {
        alt: 'Seqera',
        src: 'img/Logo.svg',
        srcDark: 'img/LogoWhite.svg',
        width: '180px',
        height: '40px',
        style: {
          width: '180px',
          height: '40px',
        },
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
          logo: {
          alt: "Seqera Docs logo",
          src: "img/seqeraIcon.svg",
          srcDark: "img/seqeraIconLight.svg",
          href: "https://docs.seqera.io",
          width: 25,
          height: 25,
        },
      links: [
      ],
    },
    languageTabs: [
      {
        highlight: 'python',
        language: 'python',
        logoClass: 'python',
      },
      {
        highlight: 'bash',
        language: 'curl',
        logoClass: 'curl',
      },
      {
        highlight: 'java',
        language: 'java',
        logoClass: 'java',
        variant: 'unirest',
      },
      {
        highlight: 'r',
        language: 'r',
        logoClass: 'r',
      },
      {
        highlight: 'javascript',
        language: 'javascript',
        logoClass: 'javascript',
      },
      {
        highlight: 'go',
        language: 'go',
        logoClass: 'go',
      },
      {
        highlight: 'powershell',
        language: 'powershell',
        logoClass: 'powershell',
      },
    ],
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: [
        'bash',
        'docker',
        'groovy',
        'ini',
        'java',
        'javascript',
        'json',
        'nginx',
        'python',
        'r',
        'shell-session',
        'sql',
        'typescript',
        'yaml',
      ],
    },
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
        type: 'text/css',
        integrity: 'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn',
        crossorigin: 'anonymous',
      },
    ],
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'platform-api',
        routeBasePath: '/platform-api',
        path: 'platform-api-docs/docs',
        remarkPlugins: [require('remark-yaml-to-table')], // Remove await and .default
        sidebarPath: 'platform-api-docs/docs/sidebar/sidebar.js',
        docItemComponent: '@theme/ApiItem',
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          platform: {
            specPath: 'platform-api-docs/scripts/seqera-api-latest-decorated-cr.yaml',
            outputDir: 'platform-api-docs/docs',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'platform-enterprise',
        routeBasePath: '/platform-enterprise',
        path: 'platform-enterprise_docs',
        remarkPlugins: [
          require('remark-code-import'),
          require('remark-math'),
          require('docusaurus-remark-plugin-tab-blocks'),
          require('remark-yaml-to-table'),
        ],
        rehypePlugins: [require('rehype-katex')],
        editUrl: 'https://github.com/seqeralabs/docs/tree/master/',
        sidebarPath: 'platform-enterprise_docs/enterprise-sidebar.json',
      },
    ],
    './src/plugins/tailwind-config.js',
  ],
  themes: ['docusaurus-theme-openapi-docs'],
};

export default config;
