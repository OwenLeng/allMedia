module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, // 配置自动启动浏览器
        hotOnly: true, // 热更新
        proxy: {
            // 配置多个跨域
            '/apii': {
                target: 'http://223.3.70.34:8080/' ,//跨域接口的地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apii': ''
                }
                },
            '/api': {
                target: 'http://223.3.80.54:8080/' ,//跨域接口的地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/apiii': {
                target: 'http://223.3.70.19:8080/' ,//跨域接口的地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apiii': ''
                }
            }
            
            

        }
    }
};