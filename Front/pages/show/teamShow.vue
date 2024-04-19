<template>
  <view>
    <text>{{ team.name }}</text>
    <carousel :image-paths="team.imagePaths"></carousel>
    <likes-and-shares :show-id="team.id" :likes="team.likes" :shares="team.shares" @newData="updateLikesAndShares"></likes-and-shares>
    <view>
      <view>
        <text @tap="checkFile">了解更多</text>
        <text @tap="contactTeam">联系团队</text>
      </view>
      <view>
        <text @tap="gotoTeamMember">成员</text>
        <text v-if="isNotIn" @tap="ApplyJoin">申请加入</text>
      </view>
    </view>
    <text>{{ team.description }}</text>
  </view>
</template>


<script>
import showsOpe from "../../common/showsOpe";
import Carousel from "../../component/common/Carousel.vue";
import LikesAndShares from "../../component/common/likesAndShares.vue";
import fileApi from "../../api/file";
import teamApi from "../../api/team";
import popup from "../../common/popup";

export default {
  name: "teamShow",
  components: {LikesAndShares, Carousel},
  data(){
    return{
      user:{},
      team:{},
      isNotIn:true
    }
  },
  onLoad(option){
    this.team=JSON.parse(decodeURIComponent(option.show))
    showsOpe.getRestImages(this.team).then(updatedShow => {
      this.team = updatedShow;
    })
    fileApi.download(this.team.fileId).then(res=>{
      this.team.filePath=res
    }).catch(err=>{
      console.log("请求文件出错："+err)
    })
    this.user=getApp().getLoadData().user
    this.isNotIn=!this.team.memberIds.include(this.user.id)
  },
  methods:{
    updateLikesAndShares(data){
      this.team.likes=data.likes
      this.team.shares=data.shares
    },
    checkFile(){
      uni.openDocument({
        filePath:this.team.filePath
      })
    },
    contactTeam(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/MessageSender?recipient=`+this.team.leaderId
      });
    },
    gotoTeamMember(){
      uni.navigateTo({
        url: `/pages/show/teamMemberShow?team=${encodeURIComponent(JSON.stringify(this.team))}`
      });
    },
    ApplyJoin(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/applyJoinTeam?recipient=`+this.team.id
      });
    }
  }
}
</script>



<style scoped>

</style>