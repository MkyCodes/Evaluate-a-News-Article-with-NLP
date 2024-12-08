const baseConfig = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const CssOptimizer = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = merge(baseConfig, {
    mode: "development",  // Set mode to 'development' for better debugging and slower builds
    devtool: "source-map",  // Provide detailed source maps for easier debugging

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,  // Apply loaders to SCSS or SASS files
                use: [
                    "style-loader",  // Inject styles into the DOM
                    "css-loader",    // Handle CSS imports and transformations
                    "sass-loader"    // Compile SASS/SCSS to CSS
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.js',  // Name of the output JavaScript bundle
        path: path.resolve(__dirname, 'dist'),  // Output directory for the build
        libraryTarget: 'var',  // Expose the bundle as a global variable
        library: 'Client',  // The global variable name
        clean: true,  // Clean the output directory before each build
    },

    optimization: {
        minimizer: [
            new CssOptimizer(),  // Use the CSS minimizer plugin to optimize the CSS
        ],
        minimize: true,  // Enable minification for production
    },
});
