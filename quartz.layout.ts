--- quartz.layout.ts
+++ quartz.layout.ts
@@
-import { PageLayout, SharedLayout } from "./quartz/cfg"
-import * as Component from "./quartz/components"
+import { PageLayout, SharedLayout } from "./quartz/cfg"
+import * as Component from "./quartz/components"
 
-// components shared across all pages
-export const sharedPageComponents: SharedLayout = {
-  head: Component.Head(),
-  header: [],
-  footer: Component.Footer({
-    links: {
-    },
-  }),
-}
+// components shared across all pages
+export const sharedPageComponents: SharedLayout = {
+  head: Component.Head(),
+  header: [],
+  footer: Component.Footer({ links: {} }),
+}
 
-// components for pages that display a single page (e.g. a single note)
-export const defaultContentPageLayout: PageLayout = {
-  beforeBody: [
-    Component.Breadcrumbs(),
-    Component.ArticleTitle(),
-    Component.ContentMeta(),
-  ],
-  left: [
-    Component.PageTitle(),
-    Component.Search(),
-    Component.Darkmode(),
-    Component.DesktopOnly(Component.RecentNotes()),
-    Component.DesktopOnly(Component.Explorer()),
-  ],
-  right: [
-    Component.TagList(),
-    Component.DesktopOnly(Component.TableOfContents()),
-    Component.Graph({
-      localGraph: {
-        linkDistance: 50,
-      },
-      globalGraph: {
-        linkDistance: 50,
-      },
-    }),
-    Component.Backlinks(),
-    Component.MobileOnly(Component.RecentNotes({
-      title: "Most recent",
-      limit: 5
-    })),
-    Component.MobileOnly(Component.Explorer({
-      title: "Explore",
-      useSavedState: true,
-      sortFn: (a, b) => {
-        if ((!a.file && !b.file) || (a.file && b.file)) {
-          // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
-          // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
-          return a.displayName.localeCompare(b.displayName, undefined, {
-            numeric: true,
-            sensitivity: "base",
-          })
-        }
-        if (a.file && !b.file) {
-          return 1
-        } else {
-          return -1
-        }
-      },
-    })),
-  ],
-}
+// helper: consistent explorer sort
+const explorerSort = (a, b) => {
+  if ((!a.file && !b.file) || (a.file && b.file)) {
+    return a.displayName.localeCompare(b.displayName, undefined, {
+      numeric: true,
+      sensitivity: "base",
+    })
+  }
+  return a.file && !b.file ? 1 : -1
+}
+
+// components for pages that display a single page (e.g. a single note)
+export const defaultContentPageLayout: PageLayout = {
+  beforeBody: [
+    Component.Breadcrumbs(),
+    Component.ArticleTitle(),
+    Component.ContentMeta(),
+    Component.TagList(),
+  ],
+  left: [
+    Component.PageTitle(),
+    Component.DesktopOnly(Component.TableOfContents()),
+    Component.DesktopOnly(Component.RecentNotes({ title: "Most recent", limit: 5 })),
+    Component.DesktopOnly(Component.Explorer({ title: "Explore", useSavedState: true, sortFn: explorerSort })),
+  ],
+  right: [
+    Component.Search(),
+    Component.Darkmode(),
+    Component.Graph({ localGraph: { linkDistance: 50 }, globalGraph: { linkDistance: 50 } }),
+    Component.Backlinks(),
+    Component.MobileOnly(Component.TableOfContents()),
+    Component.MobileOnly(Component.RecentNotes({ title: "Most recent", limit: 5 })),
+    Component.MobileOnly(Component.Explorer({ title: "Explore", useSavedState: true, sortFn: explorerSort })),
+  ],
+}
 
 // components for pages that display lists of pages (e.g. tags or folders)
 export const defaultListPageLayout: PageLayout = {
-  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
-  left: [
-    Component.PageTitle(),
-    Component.Search(),
-    Component.Darkmode(),
-    Component.DesktopOnly(Component.RecentNotes({
-      title: "Most recent",
-      limit: 5
-    })),
-    Component.DesktopOnly(Component.Explorer({
-      title: "Explore",
-      useSavedState: true,
-      sortFn: (a, b) => {
-        if ((!a.file && !b.file) || (a.file && b.file)) {
-          // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
-          // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
-          return a.displayName.localeCompare(b.displayName, undefined, {
-            numeric: true,
-            sensitivity: "base",
-          })
-        }
-        if (a.file && !b.file) {
-          return 1
-        } else {
-          return -1
-        }
-      },
-    })),
-  ],
-  right: [],
+  beforeBody: [
+    Component.Breadcrumbs(),
+    Component.ArticleTitle(),
+    Component.ContentMeta(),
+    Component.TagList(),
+  ],
+  left: [
+    Component.PageTitle(),
+    Component.DesktopOnly(Component.Explorer({ title: "Explore", useSavedState: true, sortFn: explorerSort })),
+    Component.DesktopOnly(Component.RecentNotes({ title: "Most recent", limit: 5 })),
+    Component.DesktopOnly(Component.TableOfContents()),
+  ],
+  right: [
+    Component.Search(),
+    Component.Darkmode(),
+  ],
 }
