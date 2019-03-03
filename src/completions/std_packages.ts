import { CompletionItemKind, languages, Position, TextDocument, CompletionItem } from 'vscode';

const packages = [
    {
        label: 'standard',
        documentation:
            'Package STANDARD predefines a number of types, subtypes, and functions. An implicit context clause naming this package is assumed to exist at the beginning of each design unit.'
    },
    {
        label: 'env',
        documentation:
            'Package ENV contains declarations that provide a VHDL interface to the host environment.'
    },
    {
        label: 'textio',
        documentation:
            'Package TEXTIO contains declarations of types and subprograms that support formatted I/O operations on text files.'
    }
];

export const VhdlStdPackageCompletionItemProvider = languages.registerCompletionItemProvider(
    { scheme: '*', language: 'vhdl' },
    {
        provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (linePrefix.endsWith('std.')) {
                return packages.map(pkg => {
                    let item = new CompletionItem(pkg.label);
                    item.kind = CompletionItemKind.Module;
                    item.detail = 'Standard package';
                    item.documentation = pkg.documentation;
                    return item;
                });
            }
        }
    },
    '.'
);
