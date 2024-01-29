import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Barkat's Notes",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "notes.barkata.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Rajdhani",
        body: "Space Grotesk",
        code: "JetBrains Mono",  
      },
      colors: {
        lightMode: {
          light: "#fdfdfd",
          lightgray: "#f7f4f4",
          gray: "#ede0e0",
          darkgray: "#e0bebe",
          dark: "#d77171",
          secondary: "#c93c54",
          tertiary: "#3f7e7b", 
          highlight: "rgba(59, 126, 177, 0.1)",
        },
        darkMode: {
          light: "#332d2d",
          lightgray: "#504343",
          gray: "#7b5e5e",
          darkgray: "#a27777",
          dark: "#fdfdfd",
          secondary: "#f7b2b1",
          tertiary: "#aaf1eb",
          highlight: "rgba(59, 126, 177, 0.15)"  
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
