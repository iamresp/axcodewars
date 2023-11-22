import { type BuildOptions } from './types/config'
import type { Configuration as DevSeverConfiguration } from 'webpack-dev-server'

export function buildDevServer (options: BuildOptions): DevSeverConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true
    }
}