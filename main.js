import Vue from 'vue'
import App from './App'

const request = (params = {}) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: params.loadText || 'Loading',
            mask: true
        })
        uni.request({
            url: params.url,
            method: params.method,
            data: {
                ...params.data
            },
            header: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            timeout: 5000,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        })
    })
}

Vue.config.productionTip = false
Vue.prototype.$api = {
    request
};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
