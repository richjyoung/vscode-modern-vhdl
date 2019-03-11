# VSCode Modern VHDL Support

[![Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/rjyoung.vscode-modern-vhdl-support.svg)](https://marketplace.visualstudio.com/items?itemName=rjyoung.vscode-modern-vhdl-support)
[![Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/rjyoung.vscode-modern-vhdl-support.svg)](https://marketplace.visualstudio.com/items?itemName=rjyoung.vscode-modern-vhdl-support)
[![Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/rjyoung.vscode-modern-vhdl-support.svg)](https://marketplace.visualstudio.com/items?itemName=rjyoung.vscode-modern-vhdl-support)
[![Build Status](https://travis-ci.com/richjyoung/vscode-modern-vhdl.svg?branch=master)](https://travis-ci.com/richjyoung/vscode-modern-vhdl)
[![License](https://img.shields.io/github/license/richjyoung/vscode-modern-vhdl.svg)](https://github.com/richjyoung/vscode-modern-vhdl)

This extension add language support for VHDL, based on the 2008 standard. Also includes syntax highlighting of constants, types and functions for the following standard packages:

* STD
  * standard
  * env
  * textio
* IEEE
  * std_logic_1164
  * numeric_std
  * math_real
  * math_complex
  * float_pkg
  * fixed_pkg

The core grammar definition has been written in [YAML](https://yaml.org/), to allow easier maintenance and contributions. It has been designed to be as permissive as possible, whilst enforcing syntactically correct design units and control statements.

## Features

* Syntax highlighting of VHDL files up to the 2008 standard.
* Snippets:
    * Primary & Secondary Units.
    * Process Statements.
    * `if`/`case`/`for`/`generate`.
    * Range types: `std_logic_vector`/`signed`/`unsigned`.
* Completions:
    * Standard libraries & packages (STD, IEEE).
    * Predefined attributes ('high, 'low, ...).
* [Stutter-mode](#stutter-mode), based on similar Emacs functionality.

## Coming Soon

* Control Statement Snippets
* Completions
* Symbol Extraction

## Stutter Mode

This feature provides shortcuts to cumbersome syntax elements via multiple presses of certain keys. This optional feature is disabled by default, and can be turned on for Operators, Brackets and Comments as per the following subsections. In order for this to work, you must also set `"editor.formatOnType": true` to enable live replacement of text as you type.

### Delimiter Shortcuts

Enable via `"vhdl.enableStutterDelimiters": true`.

| Shortcut | Replacement |
|:--------:|:-----------:|
| `''`     | `"`         |
| `;;`     | `:`         |
| `;;;`    | `:=`        |
| `..`     | `=>`        |
| `,,`     | `<=`        |

For all operator replacements (i.e. except `"`), spaces will be added either side of the replacement if not already present.

### Bracket Shortcuts

Enable via `"vhdl.enableStutterBrackets": true`. **Note:** These replacements are compatible with `"editor.autoClosingBrackets": true`, so long as the corresponding close bracket shortcut is also used.

| Shortcut | Replacement |
|:--------:|:-----------:|
| `[`      | `(`         |
| `[[`     | `[`         |
| `]`      | `)`         |
| `]]`     | `]`         |

### Comment Shortcuts

Enable via `"vhdl.enableStutterComments": true`.

| Shortcut | Replacement                                             |
|:--------:|:--------------------------------------------------------|
| `--`     | Automatically adds a space                              |
| `---`    | Line separator, defined by `"vhdl.stutterCommentWidth"` |
| `----`   | Display comment (surrounded by line separators)         |

**Note:** An enter keypress at the end of a line that contains a non-empty comment will continue the comment on the next line. This can be cancelled by pressing enter again.

## Contributing

Contributions are welcome via issues or pull requests. Bug reports should include a minimal example
to reproduce the behaviour. For bugs in the grammar syntax, please also include the output from
VSCode **Developer: Inspect TM Scopes** command.

Any contribution must give copyright to the owner of this repository, Rich J. Young, so that the
project can be managed freely. Copyright headers are included in each source code file and these
are expected to be unmodified. Any new files must include a similar header.

Major changes are worth discussing by creating an issue first, so that suitability can be agreed
in advance of any development effort.

## Release Notes

This is extension is under active development, and changes in each release are documented in the [CHANGELOG](./CHANGELOG.md)

---
_Copyright (c) 2019 Rich J. Young_