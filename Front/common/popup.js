
//title不要超过7个汉字
const popup = {
    showError: (title) => {
        uni.showToast({
            title: title,
            duration:1000,
            icon:"error",
            mask:true
        });
    },
    showSuccess:  (title) => {
        uni.showToast({
            title: title,
            icon:"success",
            duration:1000,
            mask:true
        });
    },
    showLoad:(title)=>{
        uni.showLoading({
            title: title,
        })
    },
    hideLoad:()=>{
        uni.hideLoading();
    },
    showConfirm: (title, content="",confirmCallback=undefined) => {
        uni.showModal({
            title: title,
            content: content,
            showCancel:false,
            success: () => {
                confirmCallback && confirmCallback();
            },
        });
    },
    showConfirmAndCancel: (title, content="",confirmCallback=undefined, cancelCallback=undefined) => {
        uni.showModal({
            title: title,
            content: content,
            success: (res) => {
                if (res.confirm) {
                    confirmCallback && confirmCallback();
                } else if (res.cancel) {
                    cancelCallback && cancelCallback();
                }
            },
        });
    }
};

export default popup;
