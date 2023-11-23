import type webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { type BuildOptions } from './types/config'

export function buildLoaders ({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    }

    const cssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]'
                    }
                }
            },
        ]
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    // TODO: remove later, when there is no js or jsx files left
    const jsxLoader = {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }

    return [
        fileLoader,
        svgLoader,
        jsxLoader,
        typescriptLoader,
        cssLoader
    ]
}