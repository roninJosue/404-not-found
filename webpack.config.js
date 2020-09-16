const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = __dirname;
const distPath = 'dist';

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(basePath, distPath)
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' 
                        ? 'style-loader' 
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, 'src/'),
                            outputPath: 'assets',
                            publicPath: '../',
                            useRelativePaths:true,                        
                        }
                    },                
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                use: [
                    'file-loader'
                ]
            },     
            {
                test: /\.html$/,
                use : [
                    'html-loader'
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'App',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css'
        })
    ]
}