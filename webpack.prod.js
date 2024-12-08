const MiniCssExtract = require("mini-css-extract-plugin");
const Terser = require("terser-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
    mode: "production",
    devtool: "hidden-source-map",  // Source map generation for production without exposing source code

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtract.loader,  // Extract CSS into separate files
                    "css-loader",  // Parse CSS into valid JS
                    "sass-loader"  // Compile SCSS/SASS into CSS
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.[contenthash].js',  // Content hash ensures unique filenames for caching
        path: path.resolve(__dirname, 'dist'),  // Output directory for the build
        libraryTarget: 'var',  // Export the output as a global variable
        library: 'Client',  // Name for the global variable
        clean: true,  // Clean the dist folder before each build
    },

    optimization: {
        minimize: true,  // Enable minification for production
        minimizer: [
            new CssMinimizer(),  // Minimize CSS files
            new Terser()  // Minimize JS files using Terser plugin
        ],
    },

    plugins: [
        new MiniCssExtract({
            filename: 'style.[contenthash].css'  // Output CSS filename with content hash for cache busting
        })
    ]
});
