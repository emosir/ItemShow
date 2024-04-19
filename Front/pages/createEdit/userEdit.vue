<template>
  <view>
    <uni-forms ref="form" :model="formData" :rules="rules">
      <uni-forms-item label="用户名" name="name" required>
        <uni-easyinput v-model="formData.name" placeholder="请输入昵称" type="text"/>
      </uni-forms-item>
      <uni-forms-item label="个人简介" name="description" required>
        <uni-easyinput v-model="formData.description" placeholder="请输入个人简介" type="text"/>
      </uni-forms-item>
    </uni-forms>
    <view>
      <checkbox-group @change="checkboxChange">
        <label v-for="item in items" :key="item.value" class="uni-list-cell uni-list-cell-pd">
          <view>
            <checkbox :checked="item.checked" :value="item.value"/>
          </view>
          <view>{{ item.name }}</view>
        </label>
      </checkbox-group>
    </view>
    <file-upload @newFile="getNewFile"></file-upload>
    <image-upload :max-images="1" @newImages="getNewImages"></image-upload>
    <button @click="preview">预览</button>
    <button @click="submit">提交</button>
  </view>
</template>
<script>
import FileUpload from "../../component/upload/fileUpload.vue";
import ImageUpload from "../../component/upload/imageUpload.vue";
import popup from "../../common/popup";
import itemApi from "../../api/item";
import fileApi from "../../api/file";
import userApi from "../../api/user";
import showsOpe from "../../common/showsOpe";

export default {
  name: "userEdit",
  components: {ImageUpload, FileUpload},
  data() {
    return {
      user: {},
      formData: {
        name: "",
        description: ""
      },
      rules: {
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入个人简介', trigger: 'blur'}
        ]
      },
      gender:0,
      items: [
        {
          value: 0,
          name: '男',
          checked: 'true'
        },
        {
          value: 1,
          name: '女',
        },
        {
          value: 2,
          name: '隐藏',
        }
      ],
      newFile:{},
      newImages:[],
    }
  },
  onLoad(option){
    this.user=JSON.parse(decodeURIComponent(option.user))
    this.gender=this.user.gender
    this.formData.name=this.user.name
    this.formData.description=this.user.description
  },
  methods: {
    getNewFile(file){
      this.newFile=file;
    },
    getNewImages(imageList){
      this.newImages=imageList;
    },
    checkboxChange(e) {
      this.$set(this.items[e.detail.value],'checked',true)
      this.gender=e.detail.value
    },
    preview(){
      let temp = {
        "id": this.user.id,
        "name": this.formData.name,
        "description": this.formData.description,
        "fileId": this.user.fileId,
        "filePath": this.newFile.path || this.user.filePath,
        "likes": "80",
        "shares": "30",
        "teamIds": this.user.teamIds,
        "imageIds": this.item.imageIds,
        "imagePaths": this.newImages.length > 0 ? this.newImages : this.item.imagePaths
      };
      uni.navigateTo({
        url: `/pages/show/userShow?show=${encodeURIComponent(JSON.stringify(temp))}`
      });
    },
    submit() {
      let temp={
        "id":this.user.id,
        "name": this.formData.name,
        "description": this.formData.description,
        "filePath":this.newFile.path,
        "imagePaths":this.newImages,
      }

      popup.showConfirmAndCancel("确认上传吗", "", (temp) => {
        popup.showLoad("上传中，请稍等");
        let uploadPromises = [];
        uploadPromises.push(userApi.uploadBase(temp.id, temp.name, temp.description));
        if(this.newFile.path)
          uploadPromises.push(fileApi.upload(temp.id, temp.filePath, "file"));
        if (temp.imagePaths.length > 0) {
          uploadPromises.push(fileApi.upload(temp.id, temp.imagePaths[0], 'head'));
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
}
</script>


<style scoped>

</style>