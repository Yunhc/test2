module.exports = {
    devServer: {
        overlay: false,
        proxy:{
            'api':{
                target: 'http://localhost:8001',
                ws:true,
                changeOrigin:true
            },
        }
    },
    // css: {
    //     loaderOptions: {
    //       scss: {
    //         prependData: `
    //           @import "@/assets/style/_mixins.scss";
    //           @import "@/assets/style/_variables.scss";
    //         `
    //         }
    //     }
    // }
}