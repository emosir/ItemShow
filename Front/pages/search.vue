<template>
  <view>
    <uni-search-bar :radius="100" @confirm="search" :focus="false" v-model="input" placeholder="搜索..."></uni-search-bar>
    <uni-segmented-control :current="segmentsCurrent" :values="segments" @clickItem="onClickSegment" styleType="button" activeColor="#4cd964"></uni-segmented-control>
    <view class="content">
      <view v-show="segmentsCurrent === 0">
        <overview :total="total.itemTotal" :pageSize="pageSize" :shows="items"></overview>
      </view>
      <view v-show="segmentsCurrent === 1">
        <overview :total="total.teamTotal" :pageSize="pageSize" :shows="teams"></overview>
      </view>
      <view v-show="segmentsCurrent === 2">
        <overview :total="total.userTotal" :pageSize="pageSize" :shows="users"></overview>
      </view>
    </view>
  </view>
</template>

<script>
import searchApi from "../api/search";
import stringOpe from "../common/stringOpe";
import popup from "../common/popup";
import Overview from "../component/overview.vue";
import showsOpe from "../common/showsOpe";

export default {
  name: "search",
  components: {Overview},
  data() {
    return {
      input: "",
      total:{
        itemTotal:1,
        teamTotal:1,
        userTotal:1,
      },
      pageSize:5,
      items: [],
      teams:[],
      users:[],
      segments: ['项目', '用户', '团队'],
      segmentsCurrent: 0
    }
  },
  onLoad(option) {
    this.input = option.input;
    this.search(this.input);
  },
  methods:{
    search(input){
      if(stringOpe.isUserItemTeamId(input)){
        searchApi.searchForShows(input).then(res=>{
          if(res.data.code===200){
            this.setRes(res)
          }else{
            popup.showError(res.data.msg)
          }
        }).catch(err=>{
          popup.showError("系统开小差啦~")
        })
      }else{
        searchApi.searchForShows(input,1,0).then(res=>{
          if(res.data.code===200){
            this.setRes(res)
          }else{
            popup.showError(res.data.msg)
          }
        }).catch(err=>{
          popup.showError("系统开小差啦~")
        })
        searchApi.searchForShows(input,1,1).then(res=>{
          if(res.data.code===200){
            this.setRes(res)
          }else{
            popup.showError(res.data.msg)
          }
        }).catch(err=>{
          popup.showError("系统开小差啦~")
        })
        searchApi.searchForShows(input,1,2).then(res=>{
          if(res.data.code===200){
            this.setRes(res)
          }else{
            popup.showError(res.data.msg)
          }
        }).catch(err=>{
          popup.showError("系统开小差啦~")
        })
      }
    },
    setRes(res){
      switch (stringOpe.checkId(res.data.data.shows[0].id)){
        case 0: {
          this.users=res.data.data.shows
          this.pageSize=res.data.data.pageSize
          this.total.userTotal=res.data.data.total
          break
        }
        case 1: {
          this.items=res.data.data.shows
          this.pageSize=res.data.data.pageSize
          this.total.itemTotal=res.data.data.total
          break
        }
        case 2: {
          this.teams=res.data.data.shows
          this.pageSize=res.data.data.pageSize
          this.total.teamTotal=res.data.data.total
          break
        }
      }
    },
    onClickSegment(e) {
      if (this.segmentsCurrent !== e.currentIndex) {
        this.segmentsCurrent = e.currentIndex;
      }
    },
    getShows(current){
      switch (this.segmentsCurrent){
        case 0:{
          searchApi.searchForShows(this.input,current,1).then(res=>{
            if(res.data.code===200){
              this.setRes(res)
              showsOpe.getHeadImages(res.data.data.shows).then(shows=>{
                this.items=shows
              }).catch(err=>{
                console.log(err)
              })
            }else{
              popup.showError(res.data.msg)
            }
          }).catch(err=>{
            popup.showError("系统开小差啦~")
          })
          break
        }
        case 1:{
          searchApi.searchForShows(this.input,current,0).then(res=>{
            if(res.data.code===200){
              this.setRes(res)
              showsOpe.getHeadImages(res.data.data.shows).then(shows=>{
                this.users=shows
              }).catch(err=>{
                console.log(err)
              })
            }else{
              popup.showError(res.data.msg)
            }
          }).catch(err=>{
            popup.showError("系统开小差啦~")
          })
          break
        }
        case 2:{
          searchApi.searchForShows(this.input,current,2).then(res=>{
            if(res.data.code===200){
              this.setRes(res)
              showsOpe.getHeadImages(res.data.data.shows).then(shows=>{
                this.teams=shows
              }).catch(err=>{
                console.log(err)
              })
            }else{
              popup.showError(res.data.msg)
            }
          }).catch(err=>{
            popup.showError("系统开小差啦~")
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