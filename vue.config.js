module.exports = {
    publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',
    runtimeCompiler: true,
    configureWebpack: (config) => {
       
    }, //(Object | Function)
    chainWebpack: (config) => {
        // Because it is multi page, cancel chunks, and each page only corresponds to a separate JS / CSS
        config.optimization
            .splitChunks({
                cacheGroups: {}
            });

        // 'src/lib' External library file under directory, not involved eslint Testing
        config.module
            .rule('eslint')
            .exclude
            .end()
    },
    // Configure the webpack dev server behavior.
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // See https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#Configuration agent
        proxy: {
            '/api': {
                target: `http://127.0.0.1:43343`,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/api": "/api"
                }
            }
        },
        disableHostCheck: true
    },
    // The configuration is higher than that of css loader in chainWebpack
    css: {
        // Whether to enable foo.module.css
        requireModuleExtension: true,
        // Whether to use the css separation plug-in ExtractTextPlugin and load it in a separate style file instead of using the <style> Method inline to html In file
        extract: true,
        // Whether to build style map or not, false will improve the construction speed
        sourceMap: false,
        // css preset configuration item
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
            }
        }
    },
    productionSourceMap: false,
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                linux: {
                    maintainer: "SKS Team",
                    category: "Office",
                },
                win: {
                    target: [{
                        target: "nsis",
                        arch: ["x64", "ia32"]
                    }]
                }
            }
        }
    }
}
