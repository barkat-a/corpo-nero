import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ContentMeta(),
    Component.ArticleTitle(),
  ],
  left: [
    Component.PageTitle(),
    Component.Darkmode(),
    Component.Search(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Breadcrumbs(),
    Component.TagList(),
    Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(Component.RecentNotes({
      title: "Continue Reading",
      limit: 4
    })),
    Component.Graph({
      localGraph: {
        linkDistance: 60,
      },
      globalGraph: {
        linkDistance: 60,
      },
    }),
    Component.Backlinks(),
    Component.MobileOnly(Component.RecentNotes({
      title: "Continue Reading",
      limit: 3
    })),
    Component.MobileOnly(Component.Explorer({
      title: "Browse",
      useSavedState: true,
      sortFn: (a, b) => {
        if ((!a.file && !b.file) || (a.file && b.file)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (a.file && !b.file) {
          return 1
        } else {
          return -1
        }
      },
    })),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes({
      title: "Recently Updated",
      limit: 5
    })),
    Component.DesktopOnly(Component.Explorer({
      title: "Navigate",
      useSavedState: true,
      sortFn: (a, b) => {
        if ((!a.file && !b.file) || (a.file && b.file)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (a.file && !b.file) {
          return 1
        } else {
          return -1
        }
      },
    })),
  ],
  right: [],
}
