import fileApi from "../api/file";


const showsOpe = {
    // 下载shows的头像并保存到imagePaths
    getHeadImages: (shows) => {
        let promises = [];
        console.log(shows)
        for (let show of shows) {
            let promise = new Promise((resolve, reject) => {
                if(!show.imagePaths)
                    show.imagePaths=[]
                fileApi.download(shows.imageIds[0]).then(res=>{
                    show.imagePaths[0]=res;
                }).catch(error => {
                    reject(error);
                });
            });
            promises.push(promise);
        }
        return Promise.all(promises).then(() => {
            return shows;
        });
    },
}


export default showsOpe;