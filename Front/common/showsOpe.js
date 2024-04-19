import fileApi from "../api/file";


const showsOpe = {
// 下载shows的头像并保存到imagePaths
    getHeadImage: (shows) => {
        let promises = [];
        for (let show of shows) {
            let promise = new Promise((resolve, reject) => {
                if(!show.imagePaths)
                    show.imagePaths = [];
                fileApi.download(show.imageIds[0]).then(res => {
                    show.imagePaths[0] = res;
                    resolve();  // 成功后解决 Promise
                }).catch(error => {
                    console.error("Failed to download image for show:", error);
                    reject(error);  // 在捕获错误时拒绝 Promise
                });
            });
            promises.push(promise);
        }
        return Promise.all(promises).then(() => {
            return shows;  // 所有头像下载完成后返回 shows 数组
        }).catch(error => {
            console.error("Error downloading one or more head images:", error);
            return shows;  // 在错误发生时，也返回 shows 数组
        });
    },

    getRestImages: (show) => {
        let promises = [];
        for (let i = 1; i < show.imageIds.length; i++) {
            let promise = new Promise((resolve, reject) => {
                fileApi.download(show.imageIds[i]).then(res => {
                    show.imagePaths[i] = res;
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
            promises.push(promise);
        }
        return Promise.all(promises).then(() => {
            return show;
        }).catch(error => {
            console.error("Error downloading images:", error);
            return show;
        });
    }

}


export default showsOpe;