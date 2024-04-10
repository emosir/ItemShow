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
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: (error) => {
                reject(error);
            }
        });
    });
};

const urlPrefix = 'http://localhost:8080/itemShow';


export default {http,urlPrefix};
