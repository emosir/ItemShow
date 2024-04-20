<template>
  <view>
    <text>申请加入{{team.name}}</text>
    <text @click="gotoMessageSender">编辑邮件</text>
    <picker @change="pickerChange" :range="positionArray" :value="index">
      <view>{{positionArray[index]}}</view>
    </picker>
    <button @click="submit">提交</button>
  </view>

</template>

<script>
import teamMemberApi from "../../api/teamMember";
import eventAndMessageUrlApi from "../../api/eventAngMessage";
import fileApi from "../../api/file";
import popup from "../../common/popup";

export default {
  name: "applyJoinTeam",
  data(){
    return{
      user:{},
      team:{},
      mail:{},
      vacantPositions:[],
      positionArray:[],
      index:0
    }
  },
  onLoad(option){
    this.team=JSON.parse(decodeURIComponent(option.team))
    this.user=getApp().globalData.user
    teamMemberApi.getTeamMembers(this.team.id).then(res=>{
      this.vacantPositions=res.data.data.vacantPositions
      this.positionArray = this.vacantPositions.map(position => position.positionName);
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    gotoMessageSender(){
      let data={
        "recipient":this.team.id,
        "sender":this.user.id,
        "flag":true
      }
      uni.navigateTo({
        url: `/pages/eventAndMessage/messageSender?data=`+data
      });
    },
    getMail(data){
      this.mail=data
    },
    pickerChange(e){
      this.index=e.detail.value
    },
    submit(){
      eventAndMessageUrlApi.applyJoinTeam(this.user.id,this.team.id,this.positionArray[this.index]).then(res=>{
        let eventId=res.data.data.eventId
        let state= res.data.data.state
        eventAndMessageUrlApi.uploadMailBase(eventId,state,this.sender,this.recipient,this.formData.topic,this.formData.description).then(res=>{
          let mailId=res.data.data.mailId
          let uploadPromises = [];
          if(this.newFile.path)
            uploadPromises.push(fileApi.upload(mailId, this.newFile.path, "mailFile"));
          for (let i = 0; i < this.newImages.length; i++) {
            uploadPromises.push(fileApi.upload(mailId, this.newImages[i], "mailImage"));
          }
          Promise.all(uploadPromises).then((results) => {
            const allSuccessful = results.every(result => result.success);
            popup.hideLoad();
            if (allSuccessful) {
              popup.showSuccess("发送成功！");
              uni.navigateBack()
            } else {
              popup.showError("部分或全部上传失败，请重试！");
            }
          }).catch((error) => {
            popup.hideLoad();
            popup.showError("上传过程中出现错误：" + error.message);
          });
        })
      })
    }
  }
}
</script>


<style scoped lang="scss">

</style>