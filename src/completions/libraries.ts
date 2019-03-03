import {
    CompletionItemKind,
    languages,
    Position,
    TextDocument,
    CompletionItem,
    workspace
} from 'vscode';

const conf = workspace.getConfiguration('vhdl');

export const VhdlLibraryCompletionItemProvider = languages.registerCompletionItemProvider(
    { scheme: '*', language: 'vhdl' },
    {
        provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (linePrefix.match(/.*use\s+/i)) {
                return ['IEEE', 'STD'].map(lib => {
                    let item = new CompletionItem(lib.toUpperCase());
                    item.kind = CompletionItemKind.Module;
                    item.detail = 'Standard Library';
                    switch (conf.get('suggestLibraryCase')) {
                        case 'upper':
                            item.insertText = lib.toUpperCase();
                            break;
                        case 'lower':
                            item.insertText = lib.toLowerCase();
                            break;
                    }
                    return item;
                });
            }
        }
    },
    ' '
);
