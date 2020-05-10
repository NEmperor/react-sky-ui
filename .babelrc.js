const outputModule = process.env.OUTPUT_MODULE;
console.log(outputModule)
module.exports = {
  
  presets: [
    [
      "@babel/preset-env",
      {
        modules: outputModule || false
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
   
  ],
  "plugins":["@babel/plugin-proposal-class-properties"]
};
