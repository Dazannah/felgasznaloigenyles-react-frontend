const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const Dotenv = require("dotenv-webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

/*
  Because I didn't bother making CSS part of our
  webpack workflow for this project I'm just
  manually copying our CSS file to the DIST folder. 
*/
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy files", function () {
      fse.copySync("./app/mystyle.css", "./dist/mystyle.css")
      fse.copySync("./app/imgs", "./dist/imgs")
      fse.copySync("./app/mystyle.css", "../felgasznaloigenyles-react-backend-api/dist/mystyle.css")
      fse.copySync("./app/imgs", "../felgasznaloigenyles-react-backend-api/dist/imgs")

      /*
        If you needed to copy another file or folder
        such as your "images" folder, you could just
        call fse.copySync() as many times as you need
        to here to cover all of your files/folders.
      */
    })
  }
}

config = {
  entry: "./app/Main.jsx",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "app"),
    filename: "bundled.js"
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "app/index-template.html",
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ],
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
}

if (currentTask == "auto" || currentTask == "dev") {
  config.devtool = "source-map"
  config.devServer = {
    port: 3001,
    static: {
      directory: path.join(__dirname, "app")
    },
    hot: true,
    liveReload: false,
    historyApiFallback: { index: "index.html" }
  }
}

if (currentTask == "build") {
  config.plugins.push(new CleanWebpackPlugin(), new RunAfterCompile())
  config.mode = "production"
  config.output = {
    publicPath: "/",
    path: path.resolve(__dirname, "../felgasznaloigenyles-react-backend-api/dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  }
}

//npm install dotenv-webpack clean-webpack-plugin html-webpack-harddisk-plugin html-webpack-plugin fs-extra

module.exports = config
