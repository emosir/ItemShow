<template>
  <view @tap="copyToClipboard">
    <text>ID:{{ showId }}</text>
    <uni-icons type="paperplane" size="30"></uni-icons>
  </view>
</template>

<script>
import popup from "../../common/popup";

export default {
  name: "copyId",
  props: ['showId'],
  methods:{
    copyToClipboard(id) {
      // 使用 uniapp 的剪贴板 API
      uni.setClipboardData({
        data: id,
        success: () => {
          popup.showSuccess("ID已复制")
        },
        fail: () => {
          popup.showError("ID复制失败")
        }
      });
    }
  }
}
</script>



<style>

</style>