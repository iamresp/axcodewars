import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { type BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export function buildPlugins ({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new webpack.ProgressPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new HTMLWebpackPlugin({
            template: paths.html,
            favicon: './public/favicon.ico',
            manifest: './public/manifest.json'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            "process.env": JSON.stringify(process.env)
        }),
        new webpack.HotModuleReplacementPlugin()
    ]

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return plugins
}