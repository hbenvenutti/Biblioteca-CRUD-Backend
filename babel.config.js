
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
          "@shared:routes": "./src/shared/infra/http/routes",
          "@firestore": "./src/shared/infra/firestore",

          "@accounts": "./src/modules/accounts",
          "@accounts:containers": "./src/module/accounts/containers",
          "@accounts:dtos": "./src/module/accounts/dtos",
          "@accounts:entities": "./src/module/accounts/entities",
          "@accounts:errors": "./src/module/accounts/errors",
          "@accounts:mappers": "./src/module/accounts/mappers",
          "@accounts:repositories": "./src/module/accounts/infra/firestore/repositories",
          "@accounts:repositories-interfaces": "./src/module/accounts/repositories",
          "@accounts:routes": "./src/modules/accounts/infra/http",
          "@accounts:use-cases": "./src/module/accounts/use-cases",

          "@books": "./src/modules/books",
          "@books:containers": "./src/module/books/containers",
          "@books:dtos": "./src/module/books/dtos",
          "@books:entities": "./src/module/books/entities",
          "@books:errors": "./src/module/books/errors",
          "@books:mappers": "./src/module/books/mappers",
          "@books:repositories": "./src/module/books/infra/firestore/repositories",
          "@books:repositories-interfaces": "./src/module/books/repositories",
          "@books:routes": "./src/modules/books/infra/http",
          "@books:use-cases": "./src/module/books/use-cases"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
		["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}
