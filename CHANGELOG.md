# Changelog

## [1.2.0] - 2025-05-22

### Added
   - added Attachments as introduced in Svelte 5.29

### Changed
   - rebuilt project as a SvelteKit library (was previously manually set up with svelte-package)
   - exported Loop class
   - cleaned up JSDoc and switched to typescript

## [1.1.3] - 2024-12-21

### Fixed
  - added missing functions and `lengths` object to ssr dummy loop
  - made internal begin, update, draw and end functions private
  - added `document` check in `loop.svelte.js`

## [1.1.2] - 2024-12-21

### Fixed
  - now checks for `window` and provides a no-op loop for ssr environments. Should work in SvelteKit now.

### Added
  - added `AutoType.svelte` to **Test-App**
  - added `test-ssr` app for SvelteKit testing

### Dependencies
  - removed `@types/mainloop.js` from devDependencies

## [1.1.1] - 2024-12-16

### Changed
  - attempt #1 to fix github npm badge caching
  - moved isVisible boolean back to `ViewLoop` component from loop state
  - changed `ViewLoop` section style to `display: contents` for easier styling

## [1.1.0] - 2024-12-16

### Changed
- fixed incorrect jsdoc type imports in `JoinLoop.svelte`

### Added
- modernised and internalised `mainloop.js`
  - this was required in order to get the library to work on the Svelte REPL
  - switched to es module export, removed old module exports
  - updated variable declarations
  - kept all original comments intact, added some jsdoc types
  - added a note about noop vs conditional performance, no change functionally

### Dependencies
- removed `mainloop.js`

## [1.0.1] - 2024-12-15

### Changed
- Removed "log update functions" button from ViewLoop component

## [1.0.0] - 2024-12-15

### Added
- Initial release of svelte-mainloop
- `JoinLoop` component for easy loop joining/leaving
- `ViewLoop` component for debugging
- Full TypeScript support
- Automatic cleanup when components are removed
- Access to all mainloop.js stages (begin, update, draw, end)

### Dependencies
- Requires Svelte 5.x (uses runes)
- Uses mainloop.js 1.0.4
