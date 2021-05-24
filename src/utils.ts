
import * as vscode from 'vscode';

export function lineRange(character: number, position: vscode.Position): vscode.Range {

    return new vscode.Range(position.line, character, position.line, position.character);
}