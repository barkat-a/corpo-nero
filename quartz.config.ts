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
        code: "Space Mono", 
      },
      colors: {
        llightMode: {
          light: "#f4fff8",
          lightgray: "#deffef",  
          gray: "#a7ffd9",
          darkgray: "#85ffc7",
          dark: "#5bffb0",
          secondary: "#3eff94",  
          tertiary: "#62be3e",
          highlight: "rgba(255, 201, 14, 0.4)", 
        },
        darkMode: {  
          light: "#3eff94",
          lightgray: "#5bffb0",
          gray: "#85ffc7",
          darkgray: "#a7ffd9",
          dark: "#deffef",
          secondary: "#f4fff8",
          tertiary: "#fb8500",
          highlight: "rgba(255, 201, 14, 0.6)",  
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
