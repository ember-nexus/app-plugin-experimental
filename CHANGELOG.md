# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Fixed
- Fix name of CI artifacts, closes #27.

## 0.0.7 - 2024-07-13
### Changed
- Remove prefix `v` from version number in release artifacts etc., closes [#24].

## 0.0.6 - 2024-07-13

## 0.0.5 - 2024-07-13

## 0.0.4 - 2024-07-13
### Changed
- Enable Originstamp integration, closes [#17].

## 0.0.3 - 2024-07-11
### Added
- Add `EmberNexusDefaultCard`, `EmberNexusDefaultThumbnail`, `EmberNexusDefaultFrameless` and `EmberNexusDefaultInlineText`, all work in progress.
- Add first CI tests.

### Changed
- Improve documentation.
- Upgrade `@ember-nexus/web-sdk` to version 0.0.59 due to breaking change.

## 0.0.2 - 2024-07-01
### Changed
- Configure `.npmignore` correctly.

## 0.0.1 - 2024-07-01
### Added
- Add `SingleElementMachine`, which features a stable state machine for basic components. Supports automatic retries.
- Add `EmberNexusDefaultIcon` and `EmberNexusDefaultPill` web components.
- Add empty documentation.
- Add CI (copied from Web SDK).

### Changed
- Change license from GPL (empty repo) to MIT.
