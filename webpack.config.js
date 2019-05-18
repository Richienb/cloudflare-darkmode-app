const path = require("path")
const webpack = require("webpack")

module.exports = {
    mode: "development",
    devtool: "hidden-source-map",
    entry: {
        index: "./src/index.js",
    },
    output: {
        filename: "[name].js",
        sourceMapFilename: "[name].map",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [{
                test: /src\/.*\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    compact: false,
                    presets: [
                        [
                            "env",
                            {
                                targets: {
                                    browsers: ["last 2 versions", "ie >= 10"],
                                },
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.sass$/,
                use: [{
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                    "extract-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
}
