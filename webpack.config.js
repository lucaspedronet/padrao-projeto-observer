const path = require('path');
const HttpWebpackPlugin = require('html-webpack-plugin');

module.exports ={
   mode: 'development',
   entry: path.resolve(__dirname, 'src', 'App.js'),
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   resolve: {
      extensions: ['.js', '.ts'],
   },
   devServer: {
      contentBase: path.resolve(__dirname, 'public')
   },
   plugins: [
      new HttpWebpackPlugin({
         template: path.resolve(__dirname, 'public', 'index.html')
      })
   ],
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