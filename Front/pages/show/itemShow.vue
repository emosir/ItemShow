<template>
  <view>
    <text>{{item.name}}</text>
    <carousel :image-paths="item.imagePaths"></carousel>
    <likes-and-shares :show-id="item.id" :likes="item.likes" :shares="item.shares" @newData="updateLikesAndShares"></likes-and-shares>
    <view>
      <view>
        <text @tap="checkFile">了解更多</text>
        <text @tap="contactTeam">联系团队</text>
      </view>
      <view>
        <text @tap="gotoTeam">项目团队</text>
        <text v-if="isOwner" @tap="gotoEdit">修改资料</text>
      </view>
    </view>
    <text>{{item.description}}</text>
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
  name: "itemShow",
  components: {LikesAndShares, Carousel},
  data(){
    return{
      user:{},
      item:{},
      isOwner:false
    }
  },
  onLoad(option){
    this.item=JSON.parse(decodeURIComponent(option.show))
    showsOpe.getRestImages(this.item).then(updatedShow => {
      this.item = updatedShow;
    })
    fileApi.download(this.item.fileId).then(res=>{
      this.item.filePath=res
    }).catch(err=>{
      console.log("请求文件出错："+err)
    })
    this.user=getApp().getLoadData().user
    this.isOwner=this.item.leaderId===this.user.id
  },
  methods:{
    updateLikesAndShares(data){
      this.item.likes=data.likes
      this.item.shares=data.shares
    },
    checkFile(){
      uni.openDocument({
        filePath:this.item.filePath
      })
    },
    contactTeam(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/MessageSender?recipient=`+this.item.leaderId
      });
    },
    gotoTeam(){
      let temp
      teamApi.getTeamById(this.item.teamId).then(res=>{
        temp=res.data.data
      }).catch(err=>{
        popup.showError(err.msg)
      })
      showsOpe.getHeadImage([temp]).then(res=>{
        temp=res[0]
      })
      uni.navigateTo({
        url: `/pages/show/teamShow?show=${encodeURIComponent(JSON.stringify(temp))}`
      });
    },
    gotoEdit(){
      let temp
      teamApi.getTeamById(this.item.teamId).then(res=>{
        temp=res.data.data
      }).catch(err=>{
        popup.showError(err.msg)
      })
      showsOpe.getHeadImage([temp]).then(res=>{
        temp=res[0]
      })
      uni.navigateTo({
        url: `/pages/createEdit/teamCreateEdit?team=${encodeURIComponent(JSON.stringify(temp))}`
      });
    }
  }
}
</script>



<style scoped>

</style>