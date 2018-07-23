const package = require("./package.json");
const path = require("path");

module.exports = {
    sections: [
        {
            name: "Introduction",
            content: "README.md",
        },
        {
            name: "Component demos",
            components: "src/components/**/*.tsx",
        },
    ],
    getComponentPathLine(componentPath) {
        const name = path.basename(componentPath, ".tsx");
        return `import { ${name} } from "${package.name}";`;
    },
    ignore: [
        "src/setupTests.ts",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/index.tsx",
        "**/index.ts",
        "**/*.d.ts",
        "styleguide.config.js",
    ],
    propsParser: require("react-docgen-typescript").withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } })
        .parse,
    webpackConfig: require("react-scripts-ts/config/webpack.config.dev.js"),
    skipComponentsWithoutExample: true,
};
