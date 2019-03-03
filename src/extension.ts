import { ExtensionContext } from 'vscode';
import {
    VhdlLibraryCompletionItemProvider,
    VhdlStdPackageCompletionItemProvider
} from './completions';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(VhdlLibraryCompletionItemProvider);
    context.subscriptions.push(VhdlStdPackageCompletionItemProvider);
}
