const StyleDictionary = require("style-dictionary");

const generateTokens = ({ sourceGlob, buildPath, destination }) => {
  const builder = StyleDictionary.extend({
    // source: ['tokens/*/.json'],
    // source: ["tokens/*.json"], // json files which may includes all themes, so override effect can occur. We need to exclude unneeded theme json file
    // source: "tokens/!(light.json)"
    source: [sourceGlob], // exclude light theme
    // source: ["tokens/testing.json"], // exclude light theme
    platforms: {
      js: {
        transformGroup: "js",
        buildPath: buildPath || "src/theme/build/js/",
        files: [
          {
            destination: destination,
            format: "javascript/es6",
          },
        ],
      },
    },
  });

  builder.buildAllPlatforms();
};

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
