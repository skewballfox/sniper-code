# sniper-code README

P.S. this currently is under development. technically usable, if you stretch what is generally meant by usable, but I wouldn't recommend unless you are trying to contribute to the project. 

implementation of [sniper snippet manager](https://github.com/skewballfox/sniper) in vscode,which when fully implemented this will allow you to use the same snippets across editors. it's planned to also have a few features not found in other snippet managers, such as modular,library-based snippets.

This project should remain pretty bare bones(only implementing function calls, and performing necessary work for vscode specific details), because I'm trying to have the majority of the work handled independently of the editor. I have a working implementation of `get_target` and `get_snippets`, but I'm currently activating for python, and currently the server is expecting snippets to be located in `.config/sniper`

## Features

- todo

## Requirements

since sniper is planned to be editor agnostic, you'll have to install the [server](https://github.com/skewballfox/sniper) independently

Until I figure out how to detach the server process from the first editor to make a request, You will need to launch sniper-server separately.

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
