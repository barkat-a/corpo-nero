// quartz.layout.ts (edit)
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({ links: {} }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes()),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.TagList(),
    Component.DesktopOnly(Component.TableOfContents()),
    // Removed the Graph component here
    Component.Backlinks(),
    Component.MobileOnly(Component.RecentNotes({ title: "Most recent", limit: 5 })),
    Component.MobileOnly(Component.Explorer({
      title: "Explore",
      useSavedState: true,
      sortFn: (a, b) => {
        if ((!a.file && !b.file) || (a.file && b.file)) {
          return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
        }
        if (a.file && !b.file) return 1
        else return -1
      },
    })),
  ],
}
