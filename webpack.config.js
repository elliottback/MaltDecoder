const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    mode: "production",
    devtool: "inline-source-map",

    entry: {
        content: './src/content.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".js"]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'data') + '/manifest.json', to: path.resolve(__dirname, 'dist') + '/manifest.json' },
                { from: path.resolve(__dirname, 'data') + '/data.json', to: path.resolve(__dirname, 'dist') + '/data.json' }
            ]
        }),
        new ZipPlugin({
          // OPTIONAL: defaults to the Webpack output filename (above) or,
          // if not present, the basename of the path
          filename: 'MaltDecoder.zip',
        })
    ]
};
