# VSCode Modern VHDL Support

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

## Coming Soon

* Primary/Secondary Unit Snippets
* Control Statement Snippets

## Release Notes

This is extension is under active development, and changes in each release are documented here.

### 0.1.0

Initial release, containing a YAML-based language definition written against the VHDL-2008 standard.

---
_Copyright (c) 2019 Rich J. Young_