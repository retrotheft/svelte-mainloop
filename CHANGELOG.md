# Changelog

## [1.1.0] - 2024-12-16
- modernised and internalised `mainloop.js`, removed as dependency
  - this was required in order to get the library to work on the Svelte REPL
  - switched to es module export, removed old module exports
  - updated variable declarations
  - kept all original comments intact, added some jsdoc types
  - added a note about noop vs conditional performance, no change functionally
- fixed incorrect jsdoc type imports in `JoinLoop.svelte`

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