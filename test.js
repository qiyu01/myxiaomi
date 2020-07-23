let axios=require('axios');
        new Vue({
            el: '#app',
            data() {
                return {
                    info: null
                }
            },
            mounted() {
                axios
                    .get('https://www.runoob.com/try/ajax/json_demo.json')
                    .then(response => (this.info = response))
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            }
        })