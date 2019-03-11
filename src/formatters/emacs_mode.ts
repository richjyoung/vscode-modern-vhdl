// Copyright (c) 2019 Rich J. Young

import {
    languages,
    Position,
    ProviderResult,
    Range,
    TextDocument,
    TextEdit,
    workspace
} from 'vscode';

export const VhdlStutterModeFormattingEditProvider = languages.registerOnTypeFormattingEditProvider(
    { scheme: '*', language: 'vhdl' },
    {
        provideOnTypeFormattingEdits(
            document: TextDocument,
            position: Position
        ): ProviderResult<TextEdit[]> {
            const conf = workspace.getConfiguration('vhdl', document.uri);

            let linePrefix = document.lineAt(position).text.substr(0, position.character);

            if (conf.get('enableStutterDelimiters')) {
                if (linePrefix.endsWith("''")) {
                    return [
                        TextEdit.replace(new Range(position.translate(0, -2), position.with()), '"')
                    ];
                } else if (linePrefix.endsWith(': ;')) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            '= '
                        )
                    ];
                } else if (linePrefix.match(/\s;;/)) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            ': '
                        )
                    ];
                } else if (linePrefix.endsWith(';;')) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            ' : '
                        )
                    ];
                } else if (linePrefix.match(/\s\.\./)) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            '=> '
                        )
                    ];
                } else if (linePrefix.endsWith('..')) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            ' => '
                        )
                    ];
                } else if (linePrefix.match(/\s,,/)) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            '<= '
                        )
                    ];
                } else if (linePrefix.endsWith(',,')) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            ' <= '
                        )
                    ];
                }
            }
            if (conf.get('enableStutterBrackets')) {
                if (linePrefix.endsWith('([')) {
                    return [
                        TextEdit.replace(new Range(position.translate(0, -2), position.with()), '[')
                    ];
                } else if (linePrefix.endsWith('[')) {
                    return [
                        TextEdit.replace(new Range(position.translate(0, -1), position.with()), '(')
                    ];
                } else if (linePrefix.endsWith(')]')) {
                    return [
                        TextEdit.replace(new Range(position.translate(0, -2), position.with()), ']')
                    ];
                } else if (linePrefix.endsWith(']')) {
                    return [
                        TextEdit.replace(new Range(position.translate(0, -1), position.with()), ')')
                    ];
                }
            }
            if (conf.get('enableStutterComments')) {
                let indent = linePrefix.match(/^(\s*).*$/)[1];
                let width: number = conf.get('stutterCompletionsBlockWidth');

                if (linePrefix.endsWith('----')) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -1), position.with()),
                            (document.eol == 1 ? '\n' : '\r\n') + indent + '-- '
                        ),
                        TextEdit.insert(
                            new Position(position.line + 1, 0),
                            indent + '-'.repeat(width) + (document.eol == 1 ? '\n' : '\r\n')
                        )
                    ];
                } else if (linePrefix.endsWith('-- -')) {
                    return [
                        TextEdit.replace(
                            new Range(position.translate(0, -2), position.with()),
                            '-'.repeat(width - 2)
                        )
                    ];
                } else if (linePrefix.endsWith('--')) {
                    return [TextEdit.insert(position.with(), ' ')];
                } else if (linePrefix.match(/^\s*$/)) {
                    let prevLineIsComment = document
                        .lineAt(position.line - 1)
                        .text.match(/^\s*(--\s*)\S+.*$/);
                    let prevLineIsEmptyComment = document
                        .lineAt(position.line - 1)
                        .text.match(/^\s*--\s*$/);
                    if (prevLineIsComment) {
                        return [TextEdit.insert(position.with(), prevLineIsComment[1])];
                    } else if (prevLineIsEmptyComment) {
                        return [
                            TextEdit.delete(new Range(position.translate(-1, 0), position.with()))
                        ];
                    }
                }
            }
            return [];
        }
    },
    ';',
    '.',
    "'",
    ',',
    '[',
    ']',
    '-',
    '\n'
);
