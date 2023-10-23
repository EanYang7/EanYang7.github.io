// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ean's 小屋",
  tagline: "我是 Ean,你好啊！",
  favicon: "img/logo.jpg",

  // Set the production url of your site here
  url: "https://eanyang7.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/doc",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "eanyang7", // Usually your GitHub org/user name.
  projectName: "doc", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          // showLastUpdateAuthor: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // Algolia 提供的应用 ID
        appId: "R1MCRZE8DZ",

        //  公开 API 密钥：提交它没有危险
        apiKey: "85af57e51ab61cbc1b23b8e76b0e7efa",

        indexName: "eanyang7io",

        // 可选：见下文
        contextualSearch: true,

        // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
        // externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: "/docs/", // or as RegExp: /\/docs\//
        //   to: "/",
        // },

        // Optional: Algolia search parameters
        // searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        // searchPagePath: "search",

        //... other Algolia params
      },
      // 设置目录显示的深度
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      // Replace with your project's social card,在社交媒体上显示的预览图
      image: "img/social-card.jpg",
      navbar: {
        hideOnScroll: true,
        title: "Ean的文档库",
        logo: {
          alt: "网站头像",
          src: "img/avatar.jpg",
          srcDark: "img/avatar_0.jpg",
          width: 40,
          style: { boxShadow: "5px 5px 7px #888" },
        },
        items: [
          // {
          //   type: "search",
          //   position: "left",
          // },
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "right",
            // label: "文档",
            html: `<html>
            <style>
            span:hover {
              transform: scale(1.3);
              color: lightgreen;
            }
            }
          </style>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
              <span class="badge badge--primary">文档 <i class="fa fa-file-text" style="font-size: 150%;"></i></span>
            </html>`,
          },
          {
            to: "/projects/",
            // label: "项目",
            position: "right",
            html: `<html>
            <style>
            span:hover {
              transform: scale(1.3);
              color: lightgreen;
            }
            }
          </style>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
              <span class="badge badge--primary">项目 <i class="fa fa-tasks" style="font-size: 150%;"></i></span>
            </html>`,
            items: [
              {
                label: "CS231n",
                href: "https://eanyang7.github.io/cs231n/",
              },
              {
                label: "React",
                to: "/docs/react",
              },
              {
                type: "docSidebar",
                label: "数学建模算法与应用",
                sidebarId: "mathematical_modeling_algorithm_and_application",
              },
              {
                type: "docSidebar",
                label: "概率论与数理统计",
                sidebarId: "probability_and_statistics",
              },
            ],
          },
          {
            type: "dropdown",
            to: "/others/",
            // label: "其他",
            position: "right",
            items: [
              {
                label: "看见统计",
                href: "https://seeing-theory.brown.edu/cn.html#firstPage",
              },
            ],
            html: `<html>
            <style>
            span:hover {
              transform: scale(1.3);
              color: lightgreen;
            }
            }
          </style>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
              <span class="badge badge--primary">其它 <i class="fa fa-ellipsis-h" style="font-size: 150%;"></i></span>
            </html>`,
          },
          {
            href: "https://github.com/EanYang7/doc",
            // label: "GitHub",
            position: "right",
            html: `<html>
            <style>
            span:hover {
              transform: scale(1.3);
              color: lightgreen;
            }
            }
          </style>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
              <span class="badge badge--primary">GitHub <i class="fa fa-github" style="font-size: 150%;"></i></span>
            </html>`,
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "文档",
            items: [
              {
                label: "Docusaurus",
                to: "/docs/Docusaurus",
              },
              {
                label: "React",
                to: "/docs/react",
              },
              {
                label: "MMDetection",
                to: "/docs/mmdetection",
              },
              {
                label: "更多...",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "项目",
            items: [
              {
                label: "cs231n",
                href: "https://eanyang7.github.io/cs231n/",
              },
              {
                label: "动手学深度学习",
                href: "https://github.com/EanYang7/d2l",
              },
            ],
          },
          {
            title: "其他",
            items: [
              {
                label: "看见统计",
                href: "https://seeing-theory.brown.edu/cn.html#firstPage",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} . Built with Ean.`,
      },
      // 配置代码高亮
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
