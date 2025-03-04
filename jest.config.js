export default {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/@stencil/core/testing/jest-preprocessor.js",
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"]
};

// extension .cjs
// module.exports = {
//   "roots": [
//     "<rootDir>/src"
//   ],
//   "transform": {
//     "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/@stencil/core/testing/jest-preprocessor.js",
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   transformIgnorePatterns: ["/node_modules/"],
//   "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//     "json",
//     "jsx"
//   ]
// }
