<template>
  <view>
    <uni-forms ref="form" :model="formData" :rules="rules">
      <uni-forms-item label="项目名称" name="name" required>
        <uni-easyinput type="text" v-model="formData.name" placeholder="请输入项目名称"/>
      </uni-forms-item>
      <uni-forms-item label="项目简介" name="description" required>
        <uni-easyinput type="text" v-model="formData.description" placeholder="请输入项目简介"/>
      </uni-forms-item>
    </uni-forms>
    <file-upload @newFile="getNewFile"></file-upload>
    <image-upload :max-images="5" @newImages="getNewImages"></image-upload>
    <button @click="preview">预览</button>
    <button @click="submit">提交</button>
  </view>
</template>

<script>
import FileUpload from "../../component/upload/fileUpload.vue";
import popup from "../../common/popup";
import fileApi from "../../api/file";
import itemApi from "../../api/item";
import ImageUpload from "../../component/upload/imageUpload.vue";

export default {
  components: {ImageUpload, FileUpload},
  data() {
    return {
      formData: {
        name: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入项目简介', trigger: 'blur' }
        ]
      },
      item:{},
      newFile:{},
      newImages:[],
    };
  },
  onLoad(option){
    this.item=JSON.parse(decodeURIComponent(option.item))
  },
  methods: {
    getNewFile(file){
      this.newFile=file;
    },
    getNewImages(imageList){
      this.newImages=imageList;
    },
    preview(){
      let temp = {
        "id": this.item.id,
        "name": this.formData.name,
        "description": this.formData.description,
        "fileId": this.item.fileId,
        "filePath": this.newFile.path || this.item.filePath,
        "likes": "80",
        "shares": "30",
        "teamId": this.item.teamId,
        "leaderId": this.item.leaderId,
        "imageIds": this.item.imageIds,
        "imagePaths": this.newImages.length > 0 ? this.newImages : this.item.imagePaths
      };
      uni.navigateTo({
        url: `/pages/show/itemShow?show=${encodeURIComponent(JSON.stringify(temp))}`
      });
    },
    submit() {
      let id
      if(!!this.item.id){
        id=this.item.teamId
      }else{
        id=this.item.id
      }
      let temp={
        "id":id,
        "name": this.formData.name,
        "description": this.formData.description,
        "filePath":this.newFile.path,
        "teamId": this.item.teamId,
        // "leaderId": this.item.leaderId,
        "imagePaths":this.newImages,
      }

      popup.showConfirmAndCancel("确认上传吗", "", (temp) => {
        popup.showLoad("上传中，请稍等");
        let uploadPromises = [];
        uploadPromises.push(itemApi.uploadItemBaseInfo(temp.id, temp.name, temp.description));
        if(this.newFile.path)
          uploadPromises.push(fileApi.upload(temp.id, temp.filePath, "itemFile"));
        if (temp.imagePaths.length > 0) {
          uploadPromises.push(fileApi.upload(temp.id, temp.imagePaths[0], 'itemHead'));
        }
        for (let i = 1; i < temp.imagePaths.length; i++) {
          uploadPromises.push(fileApi.upload(temp.id, temp.imagePaths[i], "itemTail"));
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
      });
    },
  }
};
</script>


<style>
</style>
