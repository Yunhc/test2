module.exports = {
    outputDir: '../dw_wms',
    publicPath: "/dw_wms/",
    devServer: {
        // 사용자 정의 환경 변수에서 VUE_APP_PORT가 있으면 사용하고
        // 없으면 3000 포트로 개발서버를 실행합니다.
        port: process.env.VUE_APP_PORT || 8080,
        // overlay: false,
        // proxy:{
        //     'api':{
        //         target: 'http://localhost:8001',
        //         ws:true,
        //         changeOrigin:true
        //     },
        // },
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