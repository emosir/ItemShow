<template>
  <view class="container">
    <view @tap="likeOrDislike">
      <text>喜欢：{{likes}}</text>
    </view>
    <copy-id :show-id="showId"></copy-id>
    <view @tap="shareTo">
      <text>分享：{{shares}}</text>
    </view>

  </view>
</template>

<script>
import CopyId from "./copyId.vue";
import commonApi from "../../api/common";
export default {
  name: 'likesAndShares',
  components: {CopyId},
  props: ['likes','shares','showId'],
  data(){
    return{
      user:{},
      flag:false//true表示该用户已经点赞，否则表示没有点赞
    }
  },
  onLoad(){
    this.user=getApp.globalData.user
    commonApi.likeOrDislike(this.user.id,1).then(res=>{
      this.flag= res.data.data.flag
      this.$emit('newData', {"likes":res.data.data.likes,"shares":res.data.data.shares};
    })
  },
  methods: {
    likeOrDislike(){
      commonApi.likeOrDislike(this.user.id,0).then(res=>{
        this.flag= res.data.data.flag
        this.$emit('newData', {"likes":res.data.data.likes,"shares":res.data.data.shares});
      })
    },
    shareTo(){

    }
  }

}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
