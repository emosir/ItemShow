<template>
  <view>
    <image :src="user.imagePaths[0]" class="gallery-image" />
    <text>{{ user.name }}</text>
    <view>
        <text @tap="contactUser">联系TA</text>
    </view>
    <likes-and-shares :show-id="user.id" :likes="user.likes" :shares="user.shares" @newData="updateLikesAndShares"></likes-and-shares>
    <view>
      <text @tap="checkFile">TA的简历</text>
    </view>
    <view>
      <text>关于TA:{{ user.description }}</text>
    </view>
    <view>
      <uni-segmented-control :current="segmentsCurrent" :values="segments" @clickItem="onClickSegment" styleType="button" activeColor="#4cd964"></uni-segmented-control>
      <view>
        <view v-show="segmentsCurrent === 0">
          <overview :total="leaderTotal" :pageSize="leaderPageSize" :shows="leaderTeams"></overview>
        </view>
        <view v-show="segmentsCurrent === 1">
          <overview :total="involveTotal" :pageSize="involvePageSize" :shows="involveTeams"></overview>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import LikesAndShares from "../../component/common/likesAndShares.vue";
import teamApi from "../../api/team";
import Overview from "../../component/overview.vue";


export default{
  name: "userShow",
  components: {Overview, LikesAndShares},
  data(){
    return{
      user:{},
      leaderTotal:1,
      involveTotal:1,
      leaderPageSize:1,
      involvePageSize:1,
      leaderTeams:[],
      involveTeams:[],
      segmentsCurrent:1,
      segments: ['TA领导的团队', 'TA参与的团队'],
    }
  },
  onLoad(option){
    this.user=JSON.parse(decodeURIComponent(option.show))
    this.getShows(1)
    teamApi.getUserInvolveTeams(this.user.id,1).then(res=>{
      this.leaderTeams=res.data.data
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    updateLikesAndShares(data){
      this.user.likes=data.likes
      this.user.shares=data.shares
    },
    checkFile(){
      uni.openDocument({
        filePath:this.user.filePath
      })
    },
    contactUser(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/MessageSender?recipient=`+this.user.leaderId
      });
    },
    gotoTeamMember(){
      uni.navigateTo({
        url: `/pages/show/teamMemberShow?team=${encodeURIComponent(JSON.stringify(this.user))}`
      });
    },
    ApplyJoin(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/applyJoinTeam?recipient=`+this.user.id
      });
    },
    onClickSegment(e) {
      if (this.segmentsCurrent !== e.currentIndex) {
        this.segmentsCurrent = e.currentIndex;
      }
    },
    getShows(current){
      switch (this.segmentsCurrent){
        case 0:{
          teamApi.getUserLeaderTeams(this.user.id,current).then(res=>{
            this.leaderTeams=res.data.data
          }).catch(err=>{
            console.log(err)
          })
          break
        }
        case 1:{
          teamApi.getUserInvolveTeams(this.user.id,current).then(res=>{
            this.leaderTeams=res.data.data
          }).catch(err=>{
            console.log(err)
          })
          break
        }
      }
    },
  }
}
</script>



<style scoped>

</style>