const path = require(`path`)
const glob = require(`glob`)

const pkgs = glob.sync(`./packages/*`).map(p => p.replace(/^\./, `<rootDir>`))

const reGatsby = /gatsby$/
const gatsbyDir = pkgs.find(p => reGatsby.exec(p))
const gatsbyBuildDirs = [`dist`].map(dir => path.join(gatsbyDir, dir))
const builtTestsDirs = pkgs.map(p => path.join(p, `__tests__`))
const distDirs = pkgs.map(p => path.join(p, `dist`))
const ignoreDirs = [].concat(gatsbyBuildDirs, builtTestsDirs, distDirs)
const coverageDirs = pkgs.map(p => path.join(p, `src/**/*.js`))

module.exports = {
  notify: true,
  verbose: true,
  roots: pkgs,
  modulePathIgnorePatterns: ignoreDirs,
  coveragePathIgnorePatterns: ignoreDirs,
  testPathIgnorePatterns: [
    `/examples/`,
    `/www/`,
    `/dist/`,
    `/node_modules/`,
    `__tests__/fixtures`,
  ],
  transform: { '^.+\\.js$': `<rootDir>/jest-transformer.js` },
  moduleNameMapper: {
    "^highlight.js$": `<rootDir>/node_modules/highlight.js/lib/index.js`,
  },
  collectCoverage: false,
  coverageReporters: [`json-summary`, `text`, `html`],
  coverageThreshold: {
    global: {
      lines: 45,
      statements: 44,
      functions: 42,
      branches: 43,
    },
  },
  collectCoverageFrom: coverageDirs,
}
