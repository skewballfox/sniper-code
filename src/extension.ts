//enable eslint;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as util from 'util';
import { homedir } from 'os';
//declare module "../../../sniper-node";
const sniper = require('sniper-node');

import { strict } from 'assert';
//TODO: figure out how to start sniper on any editing session, not just onLanguage
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
//console.log(process.version);
//TODO: create 'startSniper' function to either attach to running instance
//or create new instance



export function activate(context: vscode.ExtensionContext) {
	let fileName = vscode.window.activeTextEditor?.document.fileName;
	let language = vscode.window.activeTextEditor?.document.languageId;
	if (fileName && language) {
		sniper.add_target(vscode.env.sessionId, fileName, language);
	}
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log("sniper started");


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sniper.testit', () => {
		// The code you place here will be executed every time your command is executed

		//output();

		// Display a message box to the user

		vscode.window.showInformationMessage("hello from sniper");
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
