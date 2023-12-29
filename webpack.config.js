import path from 'path';
import axios from 'axios';
import CopyPlugin from 'copy-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default (env) => {

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

        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }]
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
