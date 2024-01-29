import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Corpo Nero",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Archivo Black",
        body: "Space Mono",
        code: "Space Mono",  
      },
      colors: {
        lightMode: {
          light: "#faebd7",
          lightgray: "#ffdbc4",
          gray: "#f4a7b9",
          darkgray: "#ddb6c6",
          dark: "#a770af",
          secondary: "#3a1c71",  
          tertiary: "#cf7632",
          highlight: "rgba(191, 54, 12, 0.2)",
        },
        darkMode: {
          light: "#440256",
          lightgray: "#5f0468",  
          gray: "#810978",
          darkgray: "#ac3790", 
          dark: "#faebd7",
          secondary: "#ffdbc4",
          tertiary: "#cf7632",
          highlight: "rgba(191, 54, 12, 0.4)",  
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        // you can add 'git' here for last modified from Git
        // if you do rely on git for dates, ensure defaultDateType is 'modified'
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
