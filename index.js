const StyleDictionary = require("style-dictionary");

const generateTokens = ({ sourceGlob, buildPath, destination }) => {
  const builder = StyleDictionary.extend({
    // source: ['tokens/*/.json'],
    // source: ["tokens/*.json"], // json files which may includes all themes, so override effect can occur. We need to exclude unneeded theme json file
    // source: "tokens/!(light.json)"
    source: [sourceGlob], // exclude light theme
    // source: ["tokens/testing.json"], // exclude light theme
    format: {
      // Adding a custom format to show how to get an alias's name.
      customFormat: function ({ dictionary, options }) {
        let aa = dictionary.allTokens
          .map((token) => {
            let value = JSON.stringify(token.value);
            // new option added to decide whether or not to output references
            if (options.outputReferences) {
              // the `dictionary` object now has `usesReference()` and
              // `getReferences()` methods. `usesReference()` will return true if
              // the value has a reference in it. `getReferences()` will return
              // an array of references to the whole tokens so that you can access
              // their names or any other attributes.
              if (dictionary.usesReference(token.original.value)) {
                const refs = dictionary.getReferences(token.original.value);
                refs.forEach((ref) => {
                  value = value.replace(ref.value, function () {
                    return `${ref.name}`;
                  });
                });
              }
            }

            return ` ${token.name}: ${value},`;
          })
          .join(`\n`);
        return `module.exports ={ ${aa}}`;
      },
    },
    platforms: {
      js: {
        transformGroup: "js",
        buildPath: buildPath || "src/theme/build/js/",
        files: [
          {
            destination: destination,
            // format: "javascript/es6",
            format: "customFormat",
          },
        ],
      },
    },
  });

  builder.buildAllPlatforms();
};

// module.exports = generateTokens({
//   sourceGlob: "tokens/!(light.json)",
//   destination: "darkMode.js",
// }); // dark mode
// module.exports = generateTokens({
//   sourceGlob: "tokens/!(dark.json)",
//   destination: "lightMode.js",
// }); // light mode

generateTokens({
  sourceGlob: "tokens/!(light.json)",
  destination: "darkMode.js",
}); // dark mode
generateTokens({
  sourceGlob: "tokens/!(dark.json)",
  destination: "lightMode.js",
}); // light mode

// export default {
//   source: ["/tokens/*.tokens.json"],
//   platforms: {
//     css: {
//       transformGroup: "css",
//       prefix: "sd",
//       buildPath: "build/css/",
//       files: [
//         {
//           destination: "_variables.css",
//           format: "css/variables",
//         },
//       ],
//     },
//     js: {
//       transformGroup: "js",
//       buildPath: "build/js/",
//       files: [
//         {
//           destination: "variables.js",
//           format: "javascript/es6",
//         },
//       ],
//     },
//   },
// };
