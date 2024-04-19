<template>
  <view>
    <search-bar></search-bar>
    <view>
      <text @tap="createTeam">创建团队</text>
    </view>
    <view>
      <uni-segmented-control :current="segmentsCurrent" :values="segments" @clickItem="onClickSegment" styleType="button" activeColor="#4cd964"></uni-segmented-control>
      <view>
        <view v-show="segmentsCurrent === 0">
          <overview :total="leaderTotal" :pageSize="leaderPageSize" :teams="leaderTeams"></overview>
        </view>
        <view v-show="segmentsCurrent === 1">
          <overview :total="involveTotal" :pageSize="involvePageSize" :teams="involveTeams"></overview>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
import SearchBar from "../../component/searchBar.vue";
import Overview from "../../component/overview/overviewWorkbench.vue";
import teamApi from "../../api/team";

export default {
  name: "workbenchEntrance",
  components: {Overview, SearchBar},
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
  onLoad(){
    this.user=getApp().globalData.user
    this.getShows(1)
    teamApi.getUserInvolveTeams(this.user.id,1).then(res=>{
      this.leaderTeams=res.data.data
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    createTeam(){
      uni.navigateTo({
        url: `/pages/createEdit/teamCreateEdit`
      });
    },
    onClickSegment(e) {
      if (this.segmentsCurrent !== e.currentIndex) {
        this.segmentsCurrent = e.currentIndex;
      }
    },
    getTeams(current){
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