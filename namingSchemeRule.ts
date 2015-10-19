/// <reference path="node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="node_modules/tslint/lib/tslint.d.ts" />


/**
 * This rule is to enforce our naming scheme.
 */
export class Rule extends Lint.Rules.AbstractRule {

    public static STATIC_PROPERTIES_FAIL = "Static properties should be PascalCase or UPPER_CASE.";
    public static MEMBER_PROPERTIES_FAIL = "Member properties should be camelCase.";

    public static STATIC_METHOD_FAIL     = "Static methods should be PascalCase.";
    public static MEMBER_METHOD_FAIL     = "Member methods should be camelCase.";

    public static NAMESPACE_CASING_FAIL  = "Namespace definitions should be lowercase.";
    public static NAMESPACE_NAMING_FAIL  = "Namespace definitions should begin with 'ns_'.";
    

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NamingSchemeWalker(sourceFile, this.getOptions()));
    }
}

class NamingSchemeWalker extends Lint.RuleWalker {


    /**
     * Validate static and member methods for their naming convention.
     * @param {ts.MethodDeclaration} node [description]
     */
    public visitMethodDeclaration(node: ts.MethodDeclaration) : void {

        // console.log(node.name.getText(), Lint.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword));

        const name = node.name.getText();
        if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword)) {

            if (!this.validateStaticMethod(name)) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.STATIC_METHOD_FAIL));
            }
        }
        else if (!this.validateMemeberPropertyOrMethod(name)) {

            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.MEMBER_METHOD_FAIL));
        }

        super.visitMethodDeclaration(node);
    }


    /**
     * Validate static and member properties for their naming convention.
     * @param {ts.PropertyDeclaration} node 
     */
    public visitPropertyDeclaration(node: ts.PropertyDeclaration): void {

        // console.log(node.name.getText(), Lint.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword));
        
        const name = node.name.getText();
        if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword)) { 

            if (!this.validateStaticProperty(name)) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.STATIC_PROPERTIES_FAIL));
            }
        }
        else if(!this.validateMemeberPropertyOrMethod(name)) {

            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.MEMBER_PROPERTIES_FAIL));   
        }
        
        super.visitPropertyDeclaration(node);
    }


    /**
     * Validate namespaces 
     * @param {ts.ModuleDeclaration} node 
     */
    public visitModuleDeclaration(node: ts.ModuleDeclaration) : void {

        const name = node.name.getText();

        /// should be lowercase
        if(name.toLowerCase() !== name){
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.NAMESPACE_CASING_FAIL));
        }

        /// and carry the preceeding 'ns_'
        if(name.indexOf("ns_") !== 0){
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.NAMESPACE_NAMING_FAIL));   
        }

        super.visitModuleDeclaration(node);
    }




    /**
     * must be PascalCase or UPPER_CASE
     */
    private validateStaticProperty(name:string) : boolean {

        return name.charAt(0) === name.charAt(0).toUpperCase() || (this.getSourceFile().fileName||"").indexOf("Locator") > -1;
    }

    /**
     * Must be pascal case.
     */
    private validateStaticMethod(name: string): boolean {

        return (name.charAt(0) === name.charAt(0).toUpperCase() || name.indexOf("get") === 0 || name.indexOf("set") === 0) && name.indexOf("_") === -1;
    }

    /**
     * Must be camelCase
     */
    private validateMemeberPropertyOrMethod(name:string) : boolean {

        return name.charAt(0) === name.charAt(0).toLowerCase();
    }

}
