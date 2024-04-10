import request from './http';

const fileUrl=request.urlPrefix+"/file"

const fileApi = {
    upload: (id,filePath) => {
        return new Promise((resolve, reject)=>{
            uni.uploadFile({
                url: `${fileUrl}?id=` + id,
                filePath: filePath,
                name: "file",
                success: (res) => {
                    if (res.data.code === 200) {
                        resolve(res)
                    }else{
                        reject(res)
                    }
                },fail:(res)=>{
                    reject(res)
                }
            });
        })
    },
    download: (id) => {
        return new Promise((resolve, reject) => {
            uni.downloadFile({
                url: `${fileUrl}`+"?id="+id,
                success: (res) => {
                    resolve(res.tempFilePath)
                },
                fail: (res) => {
                    reject(res);
                }
            })
        })
    },
};

export default fileApi;
