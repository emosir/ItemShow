<template>
  <view>
    <uni-icons type="cloud-upload-filled" size="30"></uni-icons>
    <text>支持主流文件格式</text>
  </view>
  <view>
    <uni-icons type="search" size="30"></uni-icons>
    <view>
      <text>点击查看当前文件</text>
    </view>
  </view>

</template>

<script>
import platStatic from "../../common/platStatic";

export default {
  name: "FileUpload",
  computed: {
    isOwner(){
      return
    }
  },
  data(){
    return{
      item:{}
    }
  },
  onLoad(){
    this.item=JSON.parse(decodeURIComponent(option.itemInfo))
    this.authToCreate = this.userInfo.identify !== "普通用户";
  },
}
</script>

<style scoped lang="scss">

</style>