<template>
  <view>
    <view v-for="team in teams" :key="team.id" >
      <uni-card  :title="team.name" :thumbnail="team.imagePath[0]" clickable link @tap="gotoTeam(team)">
        <text>{{team.description}}</text>
      </uni-card>
    </view>
    <uni-pagination :show-icon="true" :total=total :current=current :pageSize=pageSize @tap="changePage"></uni-pagination>
  </view>

</template>


<script>

export default {
  name: "overviewWorkbench",
  props:['teams','total','pageSize'],
  data(){
    return{
      current:1,
    }
  },
  methods: {
    gotoTeam(team) {
      if(getApp().globalData.user.id===team.id){
        uni.navigateTo({
          url: `/pages/workbench/workbenchLeader?team=${encodeURIComponent(JSON.stringify(team))}`
        });
      }else{
        uni.navigateTo({
          url: `/pages/workbench/workbenchMember?team=${encodeURIComponent(JSON.stringify(team))}`
        });
      }

    },
    changePage(params) {
      this.current = params.current;
      this.$parent.getTeams(this.current)
    }
  }
}
</script>


<style scoped>
</style>