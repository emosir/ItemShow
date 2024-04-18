<template>
  <view>
    <view>
      <text>输入职位名称，使用中文符号“、”分隔</text>
      <uni-forms ref="form" :model="positionFormData" :rules="positionRules">
        <uni-forms-item label="职位" name="position" required>
          <uni-easyinput type="text" v-model="positionFormData.position" placeholder="建议职位名称不超过4个字"/>
        </uni-forms-item>
      </uni-forms>
      <button @click="submitPosition">提交</button>
    </view>

    <view>
      <uni-forms ref="form" :model="userIdFormData" :rules="userIdRules">
        <uni-forms-item label="邀请" name="userId" required>
          <uni-easyinput type="text" v-model="userIdFormData.userId" placeholder="请输入用户ID"/>
        </uni-forms-item>
      </uni-forms>
      <button @click="searchUser">提交</button>
    </view>
    <view>
      <uni-forms ref="form" :model="themeFormData" :rules="themeRules">
        <uni-forms-item label="标语" name="theme" required>
          <uni-easyinput type="text" v-model="themeFormData.theme" placeholder="请输入一个简洁、有吸引力的标语"/>
        </uni-forms-item>
      </uni-forms>
      <button @click="submitTheme">提交</button>
    </view>
    <view>
      <text>发布职位信息</text>
      <text>请按以下顺序输入每个岗位需要招聘的数量，使用中文符号“、”分隔：</text>
      <li style="display: flex" v-for="position in vacantPositions">
        <text>{{position}}</text>
      </li>
      <uni-forms ref="form" :model="positionNumberFormData" :rules="positionNumberRules">
        <uni-forms-item label="职位数量" name="positionNumber" required>
          <uni-easyinput type="text" v-model="positionNumberFormData.positionNumber" placeholder="建议职位数量不超过5"/>
        </uni-forms-item>
      </uni-forms>
      <button @click="submitPositionNumber"></button>
    </view>
    <view>
      <text>{{team.name}}成员列表：</text>
      <view v-for="(member,index) in members" :key="member.id" >
        <uni-card  :title="member.name" :thumbnail="member.imagePath[0]" clickable link @tap="gotoShow(member)">
        </uni-card>
        <picker @change="pickerChange(e,index,positionArray[member.positionIndex])" :range="positionArray" :value="member.positionIndex">
          <view class="uni-input">{{positionArray[member.positionIndex]}}</view>
        </picker>
        <button @click="deleteMember(index)">删除</button>
      </view>
    </view>
  </view>

</template>

<script>
import teamMemberApi from "../../api/teamMember";
import showsOpe from "../../common/showsOpe";
import popup from "../../common/popup";

export default {
  name: "teamMemberEdit",
  data(){
    return{
      positionFormData: {
        position: "",
      },
      userIdFormData: {
        userId:"",
      },
      themeFormData: {
        theme:""
      },
      positionNumberFormData: {
        position: "",
      },
      positionRules: {
        position: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
      },
      userIdRules: {
        userId: [
          { required: true, message: '请输入用户ID', trigger: 'blur' }
        ]
      },
      themeRules: {
        theme: [
          { required: true, message: '请输入招聘标语', trigger: 'blur' }
        ]
      },
      positionNumberRules: {
        positionNumber: [
          { required: true, message: '请输入职位数量', trigger: 'blur' }
        ]
      },
      vacantPositions:[],
      positionArray:[],
      members:[],
      team:{}
    }
  },
  onLoad(option){
    this.team=JSON.parse(decodeURIComponent(option.team))
    teamMemberApi.getTeamMembers(this.team.id).then(res=>{
      this.themeFormData.theme=res.data.data.theme
      this.vacantPositions=res.data.data.vacantPositions
      this.positionNumberRules.positionNumber = this.vacantPositions.map(position => position.vacancy).join('、');
      this.positionFormData.position=this.vacantPositions.map(position => position.positionName).join('、');
      this.positionArray = this.vacantPositions.map(position => position.positionName);
      this.members=res.data.data.members
      showsOpe.getHeadImages(this.members).then(res=>{
        this.members=res;
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    submitPosition(){
      teamMemberApi.uploadPosition(this.team.id,this.positionFormData.position).then(res=>{
        popup.showSuccess("上传成功")
      }).catch(err=>{
        popup.showError(err.msg)
      })
    },
    searchUser(){
      teamMemberApi.invite(this.userIdFormData.userId,this.team.id).then(res=>{
        popup.showSuccess("邀请已发送")
      }).catch(err=>{
        popup.showError(err.msg)
      })
    },
    submitTheme(){
      teamMemberApi.uploadTheme(this.team.id,this.themeFormData.theme).then(res=>{
        popup.showSuccess("上传成功")
      }).catch(err=>{
        popup.showError(err.msg)
      })
    },
    submitPositionNumber(){
      teamMemberApi.uploadPositionNumber(this.team.id,this.positionNumberFormData.positionNumber).then(res=>{
        popup.showSuccess("上传成功")
      }).catch(err=>{
        popup.showError(err.msg)
      })
    },
    gotoShow(member){
      uni.navigateTo({
        url: `/pages/show/userShow?show=${encodeURIComponent(JSON.stringify(member))}`
      });
    },
    pickerChange(e,index,s){
      teamMemberApi.jobChange(this.members[index].id,this.team.id,s).then(()=>{
        this.members[index].positionIndex=e.detail.value
      }).catch(err=>{
        popup.showError("抱歉，职位更新出错")
      })
    },
    deleteMember(index){
      popup.showConfirmAndCancel("确认删除该成员吗？","成员名："+this.members[index].name,()=>{
        teamMemberApi.removeMember(this.members[index].id,this.team.id).then(()=>{
          popup.showSuccess("删除成功")
        }).catch(err=>{
          popup.showError(err.msg)
        })
      })
    }
  }
}
</script>



<style scoped lang="scss">

</style>