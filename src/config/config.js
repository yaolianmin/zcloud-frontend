import Env from './env';

let config = {
    env: Env
};

module.exports = {
 
  baseUrl: BASE_URL,
 
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) 
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
 
  productionSourceMap: false,
 
  //添加如下配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.70.167:80/',
        changeOrigin: true
      }
    }
  }
}

export default config;