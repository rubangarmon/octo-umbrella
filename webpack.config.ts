import path from 'path'
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js',
        publicPath: "/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.(css|scss)$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        preferRelative: true,
        plugins: [new TsConfigPathsPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4001,
        open: true,
        hot: true
    },
}

export default config;