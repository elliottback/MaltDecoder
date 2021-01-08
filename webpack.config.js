const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        content: './src/content.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".js"]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './data/data.json', to: '../data.json' }
            ]
        })
    ]
};
