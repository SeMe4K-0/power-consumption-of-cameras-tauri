# Control Questions

## Flux

Flux is one-way data flow:

1. UI triggers `action`
2. `dispatch` sends action
3. `store` updates state through `reducer`
4. UI reads new state and rerenders

## Redux scheme

- `store`: single state container for app data.
- `action`: plain object with `type` and payload.
- `dispatch`: function that sends action to reducers.
- `reducer`: pure function `(state, action) => newState`.

In this project, filter state is stored in Redux Toolkit slice and synchronized with URL + localStorage.

## Native app types

- PWA: web app installable from browser, works with service worker, standalone display mode.
- Tauri: desktop app shell with native window + embedded web UI, access to OS APIs with Rust backend.
- Classic web app: browser only, no installation and fewer offline features.

## GitHub Pages

GitHub Pages is static hosting for frontend artifacts (`dist`), usually deployed by Actions workflow.
For SPA routing on Pages, hash routing is used to avoid server-side rewrite issues.
