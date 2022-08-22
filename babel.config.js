
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
          "@accounts:routes": "./src/modules/accounts/infra/http",
          "@accounts:dtos": "./src/module/accounts/dtos"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
		["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}
