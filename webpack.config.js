const path = require('path');

module.exports ={
   mode: 'development',
   entry: path.resolve(__dirname, 'src', 'App.ts'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   resolve: {
      extensions: ['.js', '.ts'],
   },
   module: {
      rules: [
         {
            test: /\. (j|t)s$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         }
      ]
   }

}