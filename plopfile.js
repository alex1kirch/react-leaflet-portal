module.exports = function(plop) {
    var createIndex = {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/index.ts.txt",
    };

    var createReadme = {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.md",
        templateFile: "plop-templates/component.md.txt",
    };

    var createComponent = {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component.tsx.txt",
    };

    var createComponentTest = {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "plop-templates/component.test.tsx.txt",
    };

    /* Questions */
    var getComponentName = {
        type: "input",
        name: "name",
        message: "What is the component name?",
        validate: function(value) {
            if (/.+/.test(value)) {
                return true;
            }
            return "name is required";
        },
    };

    /* Options */
    plop.setGenerator("Component", {
        description: "Component",
        prompts: [getComponentName],
        actions: [createIndex, createReadme, createComponent, createComponentTest],
    });
};
