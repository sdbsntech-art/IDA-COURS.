---
name: Service worker cache versioning
description: When to increment the offline app-shell cache version and verify cache replacement.
---

Bump the shell cache name when the precache contents or offline response strategy changes, and keep a stable prefix so activation can delete older caches.

**Why:** Reusing a cache name across a service worker update can retain obsolete resources and makes cleanup of prior app shells ambiguous.

**How to apply:** When changing the offline shell, increment its cache version, then verify the new worker activates, old prefixed caches are removed, and required pages still open offline.
