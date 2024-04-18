<template>
  <view class="container">
    <view class="upload-section">
      <view class="uni-title">图片上传</view>
      <text>第一张图片将作为主要展示图，请谨慎选择</text>
      <text>{{counter}}/{{maxImages}}</text>
      <view class="image-list">
        <view class="image-item" v-for="(image, index) in imageList" :key="index">
          <image :src="image" mode="aspectFill"></image>
          <view class="delete-icon" @click="removeImage(index)">×</view>
        </view>
        <view class="add-image" v-if="imageList.length < maxImages" @click="addImageFromAlbum">+</view>
        <view class="add-image" v-if="imageList.length < maxImages" @click="addImageFromCamera">camera</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props:["maxImages"],
  data() {
    return {
      imageList: [], // 存储选中的图片
      counter:0
    }
  },
  methods: {
    addImageFromAlbum() {
      uni.chooseImage({
        count: this.maxImages - this.imageList.length,
        sourceType:["album"],
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
          this.$emit('newImages', this.imageList);
        }
      });
    },
    addImageFromCamera(){
      uni.chooseImage({
        //这里的count可能实际没有作用，测试时检查
        count: this.maxImages - this.imageList.length,
        sourceType:["camera"],
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
          this.$emit('newImages', this.imageList);
        }
      })
    },
    removeImage(index) {
      this.imageList.splice(index, 1);
      this.$emit('newImages', this.imageList);
      console.log((this.imageList))
    }
  }
}
</script>

<style>
.container {
  padding: 10px;
}
.upload-section {
  margin-top: 20px;
}
.uni-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}
.image-list {
  display: flex;
  flex-wrap: wrap;
}
.image-item {
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.image-item image {
  width: 100%;
  height: 100%;
}
.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #f00;
  font-size: 24px;
  cursor: pointer;
}
.add-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}
</style>
