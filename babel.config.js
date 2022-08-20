
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
          "@config": ["./src/config"],
          "@errors": ["./src/shared/errors"],
          "@middlewares": ["./src/shared/infra/http/middlewares"],
          "@shared": ["./src/shared"],
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
		["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}
