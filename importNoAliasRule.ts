/// <reference path="node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="node_modules/tslint/lib/tslint.d.ts" />

/* *


/// test case.

namespace a {
    export namespace a {
        export namespace a {
            export namespace a {
                export class B { };
            }
        }
    }
}
import X = a.a.a.a.B ;;;;;;;
/* */


/**
 * This rule is to make sure any import statements are named directly after their 
 * class names, instead of being given an alias.
 */
export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING: string = "'import' statements should not alias class names.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new ImportNoAliasWalker(sourceFile, this.getOptions()));
    }
}

class ImportNoAliasWalker extends Lint.RuleWalker {

    public visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration) : void {

        try {
            let children = node.getChildren();
            let importChildren = children[children.length - 2].getChildren(); // this index presumes semi-colons are enabled.
            if (children[1].getText() !== importChildren[importChildren.length - 1].getText()) {

                // create a failure at the current position
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
        catch (error) { /* meh */}

        // call the base version of this visitor to actually parse this node
        super.visitImportEqualsDeclaration(node);
    }

}
