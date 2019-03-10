// Copyright (c) 2019 Rich J. Young

import {
    CompletionItem,
    CompletionItemKind,
    languages,
    MarkdownString,
    Position,
    Range,
    TextDocument,
    TextEdit,
    workspace
} from 'vscode';

function genCompletionItem(
    shortcut: string,
    replacement: string,
    commit: string[],
    position: Position,
    md?: string
): CompletionItem {
    const item = new CompletionItem(replacement, CompletionItemKind.Snippet);
    item.insertText = replacement;
    item.detail = 'VHDL Stutter-Mode Completion';
    item.documentation =
        md || new MarkdownString(`Replace \`${shortcut}\` with \`${replacement}\``);
    item.commitCharacters = commit;
    item.additionalTextEdits = [
        new TextEdit(new Range(position.translate(0, shortcut.length * -1), position.with()), ''),
        new TextEdit(new Range(position.with(), position.translate(0, 1)), '')
    ];
    return item;
}

export const VhdlStutterModeCompletionItemProvider = languages.registerCompletionItemProvider(
    { scheme: '*', language: 'vhdl' },
    {
        provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {
            const conf = workspace.getConfiguration('vhdl', document.uri);
            if (!conf.get('enableStutterCompletions')) return [];

            let width: number = conf.get('stutterCompletionsBlockWidth');
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            let indent = linePrefix.match(/^(\s*).*$/)[1];
            let completions: CompletionItem[] = [];

            if (linePrefix.endsWith("''")) {
                completions.push(genCompletionItem("''", '"', [], position));
            } else if (linePrefix.endsWith(' ;;;')) {
                completions.push(genCompletionItem(';;;', ':= ', [' '], position));
            } else if (linePrefix.endsWith(';;;')) {
                completions.push(genCompletionItem(';;;', ' := ', [' '], position));
            } else if (linePrefix.endsWith(' ;;')) {
                completions.push(genCompletionItem(';;', ': ', [' '], position));
            } else if (linePrefix.endsWith(';;')) {
                completions.push(genCompletionItem(';;', ' : ', [' '], position));
            } else if (linePrefix.endsWith(' ..')) {
                completions.push(genCompletionItem('..', '<= ', [' '], position));
            } else if (linePrefix.endsWith('..')) {
                completions.push(genCompletionItem('..', ' <= ', [' '], position));
            } else if (linePrefix.endsWith(' ,,')) {
                completions.push(genCompletionItem(',,', '=> ', [' '], position));
            } else if (linePrefix.endsWith(',,')) {
                completions.push(genCompletionItem(',,', ' => ', [' '], position));
            } else if (linePrefix.endsWith('[[')) {
                completions.push(genCompletionItem('[[', '[', [' '], position));
            } else if (linePrefix.endsWith('[')) {
                completions.push(genCompletionItem('[', '(', [' '], position));
            } else if (linePrefix.endsWith(']]')) {
                completions.push(genCompletionItem(']]', ']', [' '], position));
            } else if (linePrefix.endsWith(']')) {
                completions.push(genCompletionItem(']', ')', [' '], position));
            } else if (linePrefix.endsWith('----')) {
                const block_start = '-'.repeat(width) + '\n' + indent + '-- ';
                const block_end = indent + '-'.repeat(width) + '\n';
                const disp = genCompletionItem(
                    '----',
                    block_start,
                    [' '],
                    position,
                    'Display comment'
                );
                const next_line_start = new Position(position.line + 1, 0);
                disp.additionalTextEdits.push(
                    new TextEdit(new Range(next_line_start, next_line_start), block_end)
                );
                completions.push(disp);
            } else if (linePrefix.endsWith('---')) {
                completions.push(
                    genCompletionItem(
                        '---',
                        '-'.repeat(width),
                        [' '],
                        position,
                        'Separator comment'
                    )
                );
            }

            return completions;
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
