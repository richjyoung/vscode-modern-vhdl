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
            let indent = linePrefix.match(/^(\s*).*$/)[1];
            let width: number = conf.get('stutterCompletionsBlockWidth');

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
                } else if (linePrefix.endsWith('---')) {
                    return [TextEdit.insert(position.with(), '-'.repeat(width - 3))];
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
    '-'
);
