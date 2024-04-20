<template>
  <view>
    <text>{{event.topic}}</text>
<!--    显示每个阶段附带的邮件-->
    <text @click="gotoMessageSender">编辑邮件</text>
  </view>
</template>

<script>
import eventAndMessageUrlApi from "../../api/eventAngMessage";

export default {
  name: "agreeTeamApply",
  data(){
    return{
      event:{},
      mail:{},
    }
  },
  onLoad(option){
    this.event=JSON.parse(decodeURIComponent(option.event))
    for(let i=0;i<this.event.steps.length;i++){
      eventAndMessageUrlApi.getMailById(this.event.steps[i].mailId).then(res=>{
        this.event.steps[i].mail=res.data.data.mail
      })
    }

  },
  methods:{
    gotoMessageSender(){
      let data={
        "recipient":this.event.sender,
        "sender":this.user.recipient,
        "flag":true
      }
      uni.navigateTo({
        url: `/pages/eventAndMessage/messageSender?data=`+data
      });
    },
  }
}
</script>


<style scoped lang="scss">

</style>