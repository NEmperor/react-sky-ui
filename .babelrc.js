const outputModule = process.env.OUTPUT_MODULE;
console.log(outputModule)
module.exports = {

  presets: [
    [
      "@babel/preset-env",
      {
        modules: outputModule || false,
        targets: { node: '8.11.1' }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",

  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-class-properties"
  ],
    
  
};
