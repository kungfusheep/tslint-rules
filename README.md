
Run an npm install (from this directory) before doing any dev work on these plugins. 

To build, run `npm run build` or `npm run watch`


## tslint-rules
A set of custom tslint rules.

### namingSchemeRule.ts

Enforces the following naming scheme

* Static properties should be PascalCase or UPPER_CASE.
* Member properties should be camelCase.
* Static methods should be PascalCase.
* Member methods should be camelCase.
* Namespace definitions should be lowercase.
* Namespace definitions should begin with 'ns_'.

## importNoAliasRule.ts

Enforces strict naming of import variables. The left hand side of the statement should exactly match the class name being imported.


