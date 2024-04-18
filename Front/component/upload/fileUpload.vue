<template>
  <view>
    <view @tap="chooseFile()">
      <uni-icons type="cloud-upload-filled" size="30"></uni-icons>
      <text>支持主流文件格式</text>
    </view>
    <view>
      <uni-icons type="search" size="30"></uni-icons>
      <view v-if="isOldFile">
        <text @tap="openFile(oldFile.path)">已上传：{{oldFile.name}}</text>
      </view>
      <view v-if="isNewFile">
        <text @tap="openFile(newFile.path)">未上传：{{newFile.name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import popup from "../../common/popup";

export default {
  name: "FileUpload",
  computed: {
    isOldFile() {
      return !!this.oldFile;
    },
    isNewFile() {
      return !!this.newFile;
    }
  },
  data() {
    return {
      oldFile: {},
      newFile: {}
    }
  },
  onLoad(option) {
    if (option) {
      this.oldFile = JSON.parse(decodeURIComponent(option.file))
    }
  },
  methods: {
    openFile(filePath) {
      wx.openDocument({
        filePath: filePath,
        fail: this.handleOpenFail
      });
    },
    handleOpenFail(err) {
      popup.showError("打开失败" + err);
    },
    chooseFile(){
      wx.chooseMessageFile({
        count: 1,
        type: 'all',
        success: (res) => {
          this.newFile=res.tempFiles[0]
          this.$emit('newFile', this.newFile);
        },
        fail: (err) => {
          this.handleOpenFail(err)
        }
      })
    }
  }
}
</script>


<style scoped lang="scss">

</style>