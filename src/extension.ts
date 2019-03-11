// Copyright (c) 2019 Rich J. Young

import { ExtensionContext } from 'vscode';
import {
    VhdlAttributeCompletionItemProvider,
    VhdlLibraryCompletionItemProvider,
    VhdlStdPackageCompletionItemProvider
} from './completions';
import { VhdlStutterModeFormattingEditProvider } from './formatters';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(VhdlAttributeCompletionItemProvider);
    context.subscriptions.push(VhdlLibraryCompletionItemProvider);
    context.subscriptions.push(VhdlStdPackageCompletionItemProvider);
    context.subscriptions.push(VhdlStutterModeFormattingEditProvider);
}
