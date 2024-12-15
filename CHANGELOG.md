# Changelog

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