//enable eslint
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as util from 'util';
//declare module "../../../sniper-node";
import { Sniper } from '../../../sniper-node';
import { strict } from 'assert';
//TODO: figure out how to start sniper on any editing session, not just onLanguage
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
console.log(process.version);
const snipe = new Sniper("../../../sniper-core/snippets/", "python");


export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log("sniper started");


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sniper.testit', async () => {
		// The code you place here will be executed every time your command is executed
		let activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
				'vscode.executeDefinitionProvider',
				activeEditor.document.uri,
				activeEditor.selection.active
			);
			if (definitions) {
				for (const definition of definitions) {
					console.log(definition.toString());
				}
			}
		}
		//output();

		// Display a message box to the user
		let activeDocument = activeEditor?.document;
		if (!activeDocument) {
			return;
		}

		vscode.window.showInformationMessage(activeDocument.fileName);
	});

	context.subscriptions.push(disposable);
}

/*async function output() {
	let disposable = vscode.commands.registerCommand('sniper-code.output', () => {
		// The code you place here will be executed every time your command is executed
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
				'vscode.executeDefinitionProvider',
				activeEditor.document.uri,
				activeEditor.selection.active
			);
			if (definitions) {
				for (const definition of definitions) {
					vscode.window.showInformationMessage(definition.toString());
				}
			}
		}
	}

*/
// this method is called when your extension is deactivated
export function deactivate() { }
