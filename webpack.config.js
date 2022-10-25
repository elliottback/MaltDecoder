const path = require('path');
const axios = require('axios');
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
const webpack = require('webpack');

const saveFile = class SaveRemoteFilePlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.make.tapAsync( 'SaveRemoteFilePlugin', (compilation, callback) => {
                let count = this.options.length;
                const logger = compiler.getInfrastructureLogger('SaveRemoteFilePlugin');

                const downloadFiles = (option) => {
                    logger.info("Downloading: " + option.url + " ...");

                    axios.get( option.url )
                        .then(function (response) {
                            logger.info('Remote file downloaded to: ', option.filepath );
                            compilation.emitAsset( option.filepath, new webpack.sources.RawSource( JSON.stringify( response.data ) ) );

                            // Issue the callback after all files have been processed
                            count--;
                            if (count === 0) {
                                callback();
                            }
                      })
                      .catch(function (error) {
                        // handle error
                        logger.error(error);
                        throw(error);
                      });
                };

                this.options.forEach(downloadFiles);
            }
        );
    }
};

module.exports = (env) => {

    // determine which chrome plugins manifest to use
    var manifest = "";
    if( env.ci != undefined )
        manifest = "manifest-ci.json";
    else if( env.production != undefined )
        manifest = "manifest.json";
    else
        throw "Unknown environment, please use ci | production!";

    return {
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
            new saveFile([
                {
                    url: 'https://github.com/elliottback/SMWS_Codes/releases/latest/download/data.json',
                    filepath: './data.json'
                },
            ]),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'data') + '/' + manifest, to: path.resolve(__dirname, 'dist') + '/manifest.json' },
                ]
            }),
            new ZipPlugin({
              // OPTIONAL: defaults to the Webpack output filename (above) or,
              // if not present, the basename of the path
              filename: 'MaltDecoder.zip',
            })
        ]
    };
};
