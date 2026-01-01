import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Barkat's Notes",
    enableSPA: false,
    enablePopovers: false,
    analytics: {
      provider: "umami", host: 'https://cloud.umami.is/script.js', websiteId:'3f6fa968-8fb9-4a09-b5a3-d4a864a532ab'
    },
    baseUrl: "notes.barkata.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      typography: {
        header: "Source Serif 4",
        body: "Source Serif 4",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fffff8",
          lightgray: "#e0e0dc",
          gray: "#999996",
          darkgray: "#454545",
          dark: "#111111",
          secondary: "#111111",
          tertiary: "#454545",
          highlight: "rgba(17, 17, 17, 0.05)",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "#333333",
          gray: "#888888",
          darkgray: "#cccccc",
          dark: "#eeeeee",
          secondary: "#eeeeee",
          tertiary: "#aaaaaa",
          highlight: "rgba(238, 238, 238, 0.08)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["git", "frontmatter", "filesystem"],
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
