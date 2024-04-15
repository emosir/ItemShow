const http = (url, method = 'GET', data = {},contentType='application/json') => {
    return new Promise((resolve, reject) => {
        uni.request({
            url:url,
            method:method,
            data:data,
            header: {
                'Content-Type': contentType,
            },
            success: (res) => {
                if (res.data.code === 200) {
                    console.log("成功：200，成功：200")
                    console.log(res.data)
                    resolve(res);
                } else {
                    console.log("成功：200，失败")
                    console.log(res.data.msg)
                    reject(res);
                }
            },
            fail: (error) => {
                console.log("失败，失败"+error)
                reject(error);
            }
        });
    });
};

const urlPrefix = 'http://localhost:8080/itemShow';


export default {http,urlPrefix};
