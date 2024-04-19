<template>
  <view>
    <uni-forms ref="form" :model="formData" :rules="rules">
      <uni-forms-item label="团队名称" name="name" required>
        <uni-easyinput type="text" v-model="formData.name" placeholder="请输入团队名称"/>
      </uni-forms-item>
      <uni-forms-item label="团队简介" name="description" required>
        <uni-easyinput type="text" v-model="formData.description" placeholder="请输入团队简介"/>
      </uni-forms-item>
    </uni-forms>
    <file-upload @newFile="getNewFile" :old-file-path="team.filePath"></file-upload>
    <image-upload :max-images="5" @newImages="getNewImages" :image-list="team.imagePaths"></image-upload>
    <button @click="preview">预览</button>
    <button @click="submit">提交</button>
  </view>
</template>

<script>
import FileUpload from "../../component/upload/fileUpload.vue";
import popup from "../../common/popup";
import fileApi from "../../api/file";
import teamApi from "../../api/team";
import ImageUpload from "../../component/upload/imageUpload.vue";
import showsOpe from "../../common/showsOpe";

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
      team:{},
      newFile:{},
      newImages:[],
    };
  },
  onLoad(option){
    this.team=JSON.parse(decodeURIComponent(option.team))
    showsOpe.getRestImages(this.team).then(res=>{
      this.team=res
    })
    fileApi.download(this.team.fileId).then(res=>{
      this.team.filePath=res
    }).catch(err=>{
      console.log(err)
    })
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
        "id": this.team.id,
        "name": this.formData.name,
        "description": this.formData.description,
        "fileId": this.team.fileId,//此处可能会有隐患，因为id和newFile不是对应的
        "filePath": this.newFile.path || this.team.filePath,
        "likes": "80",
        "shares": "30",
        "leaderId": this.team.leaderId,
        "memberIds": this.team.memberIds,
        "projectIds": this.team.projectIds,
        "imageIds": this.team.imageIds,
        "imagePaths": this.newImages.length > 0 ? this.newImages : this.team.imagePaths
      };
      uni.navigateTo({
        url: `/pages/show/teamShow?show=${encodeURIComponent(JSON.stringify(temp))}`
      });
    },
    submit() {
      let id
      if(!!this.team.id){
        id=getApp().globalData.user.id
      }else{
        id=this.team.id
      }
      let temp={
        "id":id,
        "name": this.formData.name,
        "description": this.formData.description,
        "filePath":this.newFile.path,
        "teamId": this.team.teamId,
        "leaderId": this.item.leaderId,
        "imagePaths":this.newImages,
      }
      popup.showConfirmAndCancel("确认上传吗", "", (temp) => {
        popup.showLoad("上传中，请稍等");
        let uploadPromises = [];
        uploadPromises.push(teamApi.uploadTeamBaseInfo(temp.id, temp.name, temp.description));
        if(this.newFile.path)
          uploadPromises.push(fileApi.upload(temp.id, temp.filePath, "teamFile"));
        if (temp.imagePaths.length > 0) {
          uploadPromises.push(fileApi.upload(temp.id, temp.imagePaths[0], 'teamHead'));
        }
        for (let i = 1; i < temp.imagePaths.length; i++) {
          uploadPromises.push(fileApi.upload(temp.id, temp.imagePaths[i], "teamTail"));
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
