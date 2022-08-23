
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: { node: 'current' }}],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          "@config": "./src/config",
          "@errors": "./src/shared/errors",
          "@middlewares": "./src/shared/infra/http/middlewares",

          "@shared": "./src/shared",
          "@shared:app": "./src/shared/infra/http",
          "@shared:containers": "./src/shared/containers",
          "@shared:routes": "./src/shared/infra/http/routes",
          "@firestore": "./src/shared/infra/firestore",

          "@accounts": "./src/modules/accounts",
          "@accounts:containers": "./src/modules/accounts/containers",
          "@accounts:dtos": "./src/modules/accounts/dtos",
          "@accounts:entities": "./src/modules/accounts/entities",
          "@accounts:errors": "./src/modules/accounts/errors",
          "@accounts:mappers": "./src/modules/accounts/mappers",
          "@accounts:repositories": "./src/modules/accounts/infra/firestore/repositories",
          "@accounts:repositories-interfaces": "./src/modules/accounts/repositories",
          "@accounts:routes": "./src/modules/accounts/infra/http",
          "@accounts:use-cases": "./src/modules/accounts/use-cases",

          "@books": "./src/modules/books",
          "@books:containers": "./src/modules/books/containers",
          "@books:dtos": "./src/modules/books/dtos",
          "@books:entities": "./src/modules/books/entities",
          "@books:errors": "./src/modules/books/errors",
          "@books:mappers": "./src/modules/books/mappers",
          "@books:repositories": "./src/modules/books/infra/firestore/repositories",
          "@books:repositories-interfaces": "./src/modules/books/repositories",
          "@books:routes": "./src/modules/books/infra/http",
          "@books:use-cases": "./src/modules/books/use-cases"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
		["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}
