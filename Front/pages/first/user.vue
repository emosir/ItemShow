<template>
  <view>
    <search-bar></search-bar>
    <view>
      <image :src="user.imagePaths[0]"></image>
      <text>{{user.name}}</text>
      <uni-icons :type="iconName" size="30"></uni-icons>
      <copy-id :showId="user.id"></copy-id>
    </view>
      <uni-list>
        <uni-list-item title="待办事项"
                       showExtraIcon="true"
                       extraIcon="{color: '#4cd964', size: '22', type: 'spinner'}"
                       clickable
                       link
                       @tap="gotoUserEventList()"
                       :show-badge="pendingEvents > 0"
                       :badge-text="pendingEvents.toString()">
        </uni-list-item>

        <uni-list-item title="消息"
                       showExtraIcon="true"
                       extraIcon="{color: '#4cd964', size: '22', type: 'spinner'}"
                       clickable
                       link
                       @tap="gotoUserMessageList()"
                       :show-badge="unReadMessages > 0"
                       :badge-text="unReadMessages.toString()">
        </uni-list-item>

        <uni-list-item title="修改资料"
                       showExtraIcon="true"
                       extraIcon="{color: '#4cd964', size: '22', type: 'spinner'}"
                       clickable
                       link
                       @tap="gotoUserEdit()">
        </uni-list-item>
        <uni-list-item title="查看个人对外展示页"
                       showExtraIcon="true"
                       extraIcon="{color: '#4cd964', size: '22', type: 'spinner'}"
                       clickable
                       link
                       @tap="gotoUserShow()">
        </uni-list-item>
      </uni-list>
    <view>
    </view>
  </view>
</template>

<script>
import SearchBar from "../../component/searchBar.vue";
import copyId from "../../component/common/copyId.vue";
import UniList from "../../uni_modules/uni-list/components/uni-list/uni-list.vue";
import UniListItem from "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";
import eventAndMessageUrlApi from "../../api/eventAngMessage";
import fileApi from "../../api/file";
import showsOpe from "../../common/showsOpe";

export default {
  name: "user",
  components: {UniListItem, UniList, copyId, SearchBar},
  computed:{
    iconName(){
      return this.user.gender===0?"left":"right"
    }
  },
  data(){
    return{
      user:{},
      unReadMessages:0,
      pendingEvents:0,
      messages:[],
      events:[],
    }
  },
  onLoad(){
    this.user=getApp().globalData.user
    fileApi.download(this.user.fileId).then(res=>{
      this.user.filePath = res || ""
    }).catch(err=>{
      console.log(err)
    })
    showsOpe.getHeadImage([this.user]).then(res=>{
      this.user=res[0]
    })
    eventAndMessageUrlApi.getUserEventAndMessage(this.user.id).then(res=>{
      this.setRes(res)
    }).catch(err=>{
      console.log("获取用户待办事项和信息失败"+err)
    })
  },
  methods:{
    setRes(res){
      this.unReadMessages=res.data.data.message.unReadCount
      this.messages=res.data.data.message.messages
      this.pendingEvents=res.data.data.event.pendingCount
      this.events=res.data.data.event.events
    },
    gotoUserEventList(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/userEventList?events=${encodeURIComponent(JSON.stringify(this.events))}`
      });
    },
    gotoUserMessageList(){
      uni.navigateTo({
        url: `/pages/eventAndMessage/userMessageList?messages=${encodeURIComponent(JSON.stringify(this.messages))}`
      });
    },
    gotoUserEdit(){
      uni.navigateTo({
        url: `/pages/createEdit/userEdit.vue?user=${encodeURIComponent(JSON.stringify(this.user))}`
      });
    },
    gotoUserShow(){
      uni.navigateTo({
        url: `/pages/show/userShow.vue?show=${encodeURIComponent(JSON.stringify(this.user))}`
      });
    }
  }
}
</script>



<style scoped>

</style>