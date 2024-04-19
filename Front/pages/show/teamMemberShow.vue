<template>
  <view>
    <view>
      <text>{{theme}}</text>
      <li v-for="vacantPosition in vacantPositions">
        <text>{{vacantPosition.positionName}}:</text>
        <text>{{vacantPosition.vacancy}}</text>
      </li>
    </view>
    <view>
      <text v-if="!isIn" @tap="applyJoinTeam">申请加入</text>
      <text @tap="contactTeam">联系团队</text>
    </view>
    <view>
      <text>{{team.name}}成员列表</text>
      <uni-list v-for="member in members">
        <uni-list-item :title="member.name" :thumb="member.imagePaths[0]"
                       thumb-size="lg" :rightText="member.positionString"></uni-list-item>
      </uni-list>
    </view>
  </view>
</template>


<script>
import teamMemberApi from "../../api/teamMember";
import showsOpe from "../../common/showsOpe";

export default {
  name: "teamMemberShow",
  computed: {
  },
  data(){
    return{
      team:{},
      theme:"",
      members:[],
      vacantPositions:[],
      isIn:false
    }
  },
  onLoad(option){
    this.user=getApp().getLoadData().user
    this.team=JSON.parse(decodeURIComponent(option.team))
    teamMemberApi.getTeamMembers(this.team.id).then(res=>{
      this.theme=res.data.data.theme
      this.vacantPositions=res.data.data.vacantPositions
      this.members=res.data.data.members
      showsOpe.getHeadImage(this.members).then(res=>{
        this.members=res
      })
      for (let member of this.members) {
        member.positionString = member.positionName.join("\\");
      }
    }).catch(err=>{
      console.log(err)
    })
    this.isIn=this.members.some(member => member.userId === this.user.id);
  },
  methods:{
    applyJoinTeam(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/applyJoinTeam?recipient=`+this.team.id
      });
    },
    contactTeam(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/messageSender?recipient=`+this.team.id
      });
    }
  }
}
</script>


<style scoped>

</style>