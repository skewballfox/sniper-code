# sniper-code README

WARNING: NOT READY

this currently is under development. 

implementation of [sniper snippet manager](https://github.com/skewballfox/sniper) in vscode,which when fully implemented this will allow you to use the same snippets across editors. it's planned to also have a few features not found in other snippet managers, such as modular,library-based snippets.

right now I'm mainly just working on implementing the minimum basic functionality (getting completions, getting snippets). This project should remain pretty bare bones(only implementing function calls, and performing necessary work for vscode specific details), because I'm trying to have the majority of the work handled independently of the editor.

## Features

- todo

## Requirements

since sniper is planned to be editor agnostic, you'll have to install the [server](https://github.com/skewballfox/sniper) independently

also right now you'll need to clone [sniper-node](https://github.com/skewballfox/sniper-node) into the same parent directory as this project, as I'm using relative pathing to build the project mainly so that I don't have to update the version info until I actually have a working implementation ( which will be `0.0.1`).

Currently the only reason you should do the above is if you want to contribute to the project, because it is nowhere near ready for use.

## Extension Settings

- todo


## Known Issues

- it's not ready to use lol

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

- todo

### For more information

- [the server for sniper and explanation of the entire project(including planned features)](https://github.com/skewballfox/sniper)

**Enjoy!**
