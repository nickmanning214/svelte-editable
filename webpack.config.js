var path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  

  entry: {
    'index':'./src/editable.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        loader: 'babel-loader',
        options:{
            presets: ['env']
        }
      },
      {
        test: /\.scss$/,
        loader: 'inline-css-webpack-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.mjs','.js', '.jsx', '.scss']
  },
  
  plugins: [
    /*
    new MiniCssExtractPlugin({
      //filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      //chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      filename:'[name].css',
      chunkFilename: '[id].css'
    })*/
  ],
  externals: {
  }
};
