const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssOptimizer = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: ["./src/client/index.js"],  // Entry point for the application

    module: {
        rules: [
            {
                test: /\.js$/,  // Apply the Babel loader for JavaScript files
                exclude: /node_modules/,  // Exclude the node_modules directory
                loader: "babel-loader"  // Use Babel for transpiling JavaScript
            }
        ]
    },

    optimization: {
        minimize: true,  // Enable minimization of assets
        minimizer: [
            new CssOptimizer(),  // Minimize CSS with the CssMinimizer plugin
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: "./src/client/views/index.html",  // HTML template to inject the bundled JS
            filename: "index.html"  // Output HTML file name
        }),

        new CleanWebpackPlugin({
            dry: true,  // Only simulate cleaning, do not delete files (useful for debugging)
            verbose: false,  // Disable detailed log output
            cleanStaleWebpackAssets: true,  // Automatically clean unused Webpack assets
            protectWebpackAssets: false,  // Allow deletion of all assets, even if not explicitly marked for protection
        }),
    ]
};
