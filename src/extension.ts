//enable eslint;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//import * as util from 'util';
import { lineRange } from './utils'
import { homedir } from 'os';
import { strict } from 'assert';

const sniper = require('sniper-node');

let insertingSnippet = false;
/**
 * Used to convert the snippet provided by sniper into a vscode specific format
 * @function VATSMode
 * @param {vscode.TextEditor} 	editor		the current active editor
 * @param {String} 				snippetName the name of the snippet being requested
 * @return {Promise<SnippetString>}			A VSCode Snippet String
 */
export async function VATSMode(editor: vscode.TextEditor, snippetName: String | vscode.SnippetString) {
	console.log("entered VATS");

	let sniperSnippet = sniper.get_snippet(vscode.env.sessionId, editor.document.fileName, snippetName);

	console.log("got snippet: ", sniperSnippet);
	return new vscode.SnippetString(sniperSnippet.join('\n'));


}

//TODO: figure out how to start sniper on any editing session, not just onLanguage
// this method is called when your extension is activated

//TODO: create 'startSniper' function to either attach to running instance
//or create new instance

export async function expandSnippet(
	completion: vscode.CompletionItem,
	editor: vscode.TextEditor,
) {
	console.log("starting expansion");

	if (completion.insertText != undefined &&
		completion.range != undefined && completion.range instanceof vscode.Range) {
		let snippetContent = await VATSMode(editor, completion.insertText);





		//insertingSnippet = true;
		console.log("deleting range");
		await editor.edit(
			(eb) => {
				if (completion.range != undefined && completion.range instanceof vscode.Range) {
					eb.delete(completion.range);
					console.log("should be gone");
				}
			},
			{ undoStopAfter: false, undoStopBefore: false }
		);

		await editor.insertSnippet(snippetContent, completion.range.start, {
			undoStopAfter: false,
			undoStopBefore: false,
		});
	}

	// if (snippetInstance.selectedPlaceholder != 0) SNIPPET_STACK.unshift(snippetInstance);
	// insertingSnippet = false;
}

export function activate(context: vscode.ExtensionContext) {
	let fileName = vscode.window.activeTextEditor?.document.fileName;
	let language = vscode.window.activeTextEditor?.document.languageId;
	if (fileName && language) {

		sniper.add_target(vscode.env.sessionId, fileName, language);
	}


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log("sniper started");


	//NOTE: to give credit where credit is due, this is partially borrowed from hsnips(link below)
	//I say partially because it's been stripped of a lot of the functionality specific to that extension
	//I mainly needed a reference point for how to do X in vscode, and I suspect as this develops this 
	//extension will look less and less like hsnips in implementation. That being said, There is no way I 
	//would have reached a working vscode implmentation as fast as I did had their project not been open 
	//source, and I am really grateful that their project was available to reference and borrow
	//https://github.com/draivin/hsnips

	context.subscriptions.push(
		vscode.commands.registerTextEditorCommand(
			'sniper.snipe',
			(editor, _, completion: vscode.CompletionItem) => {
				console.log("command triggered for ", completion);
				expandSnippet(completion, editor);
			}
		)
	);

	context.subscriptions.push(
		//it doesn't seem as though mapping function calls to completions items is possible
		//https://vshaxe.github.io/vscode-extern/vscode/CompletionItem.html#TextEdit
		//so going with manual checks


		vscode.languages.registerCompletionItemProvider(

			[{ scheme: 'untitled' }, { scheme: 'file' }], {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let currentWordRange = document.getWordRangeAtPosition(position);
				console.log("starting completion request at: ", Date.now());

				let completions = sniper.get_completions(vscode.env.sessionId,
					document.uri.path,
					document.getText(currentWordRange)//the current word being input
				).map((s: { name: string, description: string }) => {

					console.log("adding completion: ", s.name);
					let completion = new vscode.CompletionItem(s.name);
					completion.insertText = s.name;
					completion.detail = s.description;
					completion.command = {
						command: 'sniper.snipe',
						title: 'snipe',
						arguments: [completion],
					};

					if (currentWordRange) {
						completion.range = new vscode.Range(currentWordRange.start, position.translate(0, s.name.length));
					}
					console.log(completion.range);
					//documentation for position and it's translate method
					//https://vshaxe.github.io/vscode-extern/vscode/Position.html
					return completion
				});
				console.log("returning completions at: ", Date.now());
				console.log(completions);
				return completions

			}
		})
	);

}


// this method is called when your extension is deactivated
export function deactivate() { }
