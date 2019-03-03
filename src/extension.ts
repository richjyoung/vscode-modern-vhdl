import { ExtensionContext } from 'vscode';
import { VhdlStdPackageCompletionItemProvider } from './completions';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(VhdlStdPackageCompletionItemProvider);
}