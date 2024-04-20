<template>
  <view>
    <view>
      <text>收件人：{{recipient}}</text>
    </view>
    <view>
      <uni-forms ref="form" :model="formData" :rules="rules">
        <uni-forms-item label="主题" name="topic" required>
          <uni-easyinput type="text" v-model="formData.topic" placeholder="请输入主题"/>
        </uni-forms-item>
        <uni-forms-item label="邮件正文" name="description" required>
          <uni-easyinput type="text" v-model="formData.description" placeholder="请输入邮件正文"/>
        </uni-forms-item>
      </uni-forms>
    </view>
    <view>
      <file-upload @newFile="getNewFile"></file-upload>
    </view>
    <view>
      <image-upload :max-images="5" @newImages="getNewImages"></image-upload>
    </view>
    <button @click="submit">发送</button>
  </view>

</template>

<script>
import ImageUpload from "../../component/upload/imageUpload.vue";
import FileUpload from "../../component/upload/fileUpload.vue";
import eventAndMessageUrlApi from "../../api/eventAngMessage";
import itemApi from "../../api/item";
import fileApi from "../../api/file";
import popup from "../../common/popup";

export default {
  name: "messageSender",
  components: {FileUpload, ImageUpload},
  data(){
    return{
      sender:"",
      recipient:"",
      formData: {
        topic: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入主题', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入邮件正文', trigger: 'blur' }
        ]
      },
      newFile:{},
      newImages:[],
      flag:false
    }
  },
  onLoad(option){
    let data=JSON.parse(decodeURIComponent(option.data))
    this.recipient=data.recipient
    this.sender=data.sender
    if(option.flag)
      this.flag=true
  },
  methods:{
    getNewFile(file){
      this.newFile=file;
    },
    getNewImages(imageList){
      this.newImages=imageList;
    },
    submit(){
      if(this.flag){
        let data={
          "sender":this.sender,
          "recipient":this.recipient,
          "topic":this.formData.topic,
          "description":this.formData.description,
          "newFile":this.newFile,
          "newImages":this.newImages
        }
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2] /
        uni.navigateBack({
          delta:1,
          success:() => {
            prevPage.$vm.getMail(data)
          }
        })
      }else{
        eventAndMessageUrlApi.uploadMailBase("none","none",this.sender,this.recipient,this.formData.topic,this.formData.description).then(res=>{
          let mailId=res.data.data.mailId
          let uploadPromises = [];
          if(this.newFile.path)
            uploadPromises.push(fileApi.upload(mailId, this.newFile.path, "mailFile"));
          for (let i = 0; i < this.newImages.length; i++) {
            uploadPromises.push(fileApi.upload(mailId, this.newImages[i], "mailImage"));
          }
          Promise.all(uploadPromises).then((results) => {
            const allSuccessful = results.every(result => result.success);
            popup.hideLoad();
            if (allSuccessful) {
              popup.showSuccess("上传成功！");
              uni.navigateBack()
            } else {
              popup.showError("部分或全部上传失败，请重试！");
            }
          }).catch((error) => {
            popup.hideLoad();
            popup.showError("上传过程中出现错误：" + error.message);
          });
        })
      }
    }
  }
}
</script>



<style scoped lang="scss">

</style>