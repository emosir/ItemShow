<template>
  <view>
    <view>
      <text>
        {{team.name}}
      </text>
      <likes-and-shares :shares="team.shares" :likes="team.likes" :show-id="team.id" @newData="updateLikesAndShares"></likes-and-shares>
    </view>
    <view>
      <text @tap="gotoTeamMemberEdit">团队人事管理</text>
      <text @tap="gotoTeamShow">预览团队对外展示页</text>
      <text @tap="gotoTeamEdit">修改团队资料</text>
      <text @tap="createItem">创建项目</text>
    </view>
    <view>
      <text>{{team.name}}的所有项目</text>
      <overview :shows="teamItems" :pageSize="pageSize" :total="total"></overview>
    </view>
  </view>

</template>

<script>
import LikesAndShares from "../../component/common/likesAndShares.vue";
import Overview from "../../component/overview/overview.vue";
import itemApi from "../../api/item";
import showsOpe from "../../common/showsOpe";
import fileApi from "../../api/file";

export default {
  name: "workbenchLeader",
  components: {Overview, LikesAndShares},
  data(){
    return{
      team:{},
      teamItems:[],
      pageSize:5,
      total:1,
    }
  },
  onLoad(option){
    this.team = JSON.parse(decodeURIComponent(option.team));
    showsOpe.getHeadImage([this.team]).then(res=>{
      this.team=res[0]
    })
    showsOpe.getRestImages([this.item]).then(res=>{
      this.team=res[0]
    })
    fileApi.download(this.team.fileId).then(res=>{
      this.team.filePath=res
    })
    itemApi.getTeamItems(this.team.id,1).then(res=>{
      this.pageSize=res.data.data.pageSize
      this.total=res.data.data.total
      this.teamItems=res.data.data.items
      showsOpe.getHeadImage(this.teamItems).then(res=>{
        this.teamItems=res
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    updateLikesAndShares(data){
      this.item.likes=data.likes
      this.item.shares=data.shares
    },
    getShows(current){
      itemApi.getTeamItems(this.team.id,1).then(res=>{
        this.pageSize=res.data.data.pageSize
        this.total=res.data.data.total
        this.teamItems=res.data.data.items
        showsOpe.getHeadImage(this.teamItems).then(res=>{
          this.teamItems=res
        })
      }).catch(err=>{
        console.log(err)
      })
    },
    gotoTeamMemberEdit(){
      uni.navigateTo({
        url: `/pages/createEdit/teamMemberEdit?team=${encodeURIComponent(JSON.stringify(this.team))}`
      });
    },
    gotoTeamShow(){
      uni.navigateTo({
        url: `/pages/show/teamShow?show=${encodeURIComponent(JSON.stringify(this.team))}`
      });
    },
    gotoTeamEdit(){
      uni.navigateTo({
        url: `/pages/createEdit/teamCreateEdit?team=${encodeURIComponent(JSON.stringify(this.team))}`
      });
    },
    createItem(){
      uni.navigateTo({
        url: `/pages/createEdit/itemCreateEdit?team=${encodeURIComponent(JSON.stringify(this.team))}`
      });
    },
  }
}
</script>



<style scoped>

</style>