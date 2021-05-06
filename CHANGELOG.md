# Change Log
All notable changes to the "vscode-modern-vhdl-support" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [v1.0.6]
- Grammar and indentation issues ([@pvanschendel](https://github.com/pvanschendel))
- Errors with 'is' in names ([@DanChianucci](https://github.com/DanChianucci))
- Highlighting of words beginning 'end' ([@Obliged](https://github.com/Obliged))
- Remove deprecated packages, and bump minimum vscode release to 1.50.0.

## [v1.0.5]
- Fix indent after type statements.
- Fix case sensitivity in enums. ([@SiMylo](https://github.com/SiMylo))
- Fix issue with the `process` keyword. ([@pvanschendel](https://github.com/pvanschendel))
- Fix display of character literals in enums. ([@pvanschendel](https://github.com/pvanschendel))

## [v1.0.4]
- Fix bug whereby only lowercase names were suggested.

## [v1.0.3]
- Re-release due to error in changelog.

## [v1.0.2]
- Added wordPattern to language config for better symbol extraction.
- Fix completions showing beyond trigger point.
- Fix indent of process statement, additional prefixes. ([@droerich](https://github.com/droerich))

## [v1.0.1]
- Added indent patterns. ([@DanChianucci](https://github.com/DanChianucci))
- Clean up grammar rules and scopes. ([@DanChianucci](https://github.com/DanChianucci))

## [v1.0.0]
- Major release: Seems stable enough to remove preview flag.
- Additional snippets. ([@droerich](https://github.com/droerich))
- Fix comments inside enum lists. ([@DanChianucci](https://github.com/DanChianucci))

## [v0.0.7]
- Max line length setting for stutter-mode comments.

## [v0.0.6]
- Stutter-mode completions (based on similar Emacs feature).

## [v0.0.5]
- Completions for predefined attributes.
- Snippets for various process statements. ([@jethro33](https://github.com/jethro33))

## [v0.0.4]
- Completions for standard library packages.

## [v0.0.3]
- No change from v0.0.2, first build in Travis CI.

## [v0.0.2]
- Basic snippets added.
- Constant highlighting in `when` statements.
- Basic grammar fallback at the top level.
- Fixes:
    - Mismatched label in `generate` statements.

## [v0.0.1]
- Syntax support for VHDL, up to and including VHDL-2008.
- Constants, Types and Functions for IEEE and STD library packages.