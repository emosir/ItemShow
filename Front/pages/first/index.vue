<template>
  <view>
    <view>
      <text>{{platStatic.platName}}</text>
      <uni-search-bar @confirm="gotoSearch" :focus="true" v-model="input" placeholder="搜索..."></uni-search-bar>
    </view>
    <view>
      <text @tap="changeShows">{{displayInfo}}</text>
      <template>
        <overview :shows="displayItems" :pageSize="pageSize" :total="total"></overview>
      </template>
    </view>
  </view>
</template>

<script>
	import platStatic from "../../common/platStatic";
  import itemApi from "../../api/item";
  import Overview from "../../component/overview.vue";
  import showsOpe from "../../common/showsOpe";

  export default {
    components: {Overview},
    computed: {
      platStatic() {
        return platStatic
      },
      displayItems() {
        return this.flag ? this.hotItems : this.newItems;
      },
      displayInfo(){
        return this.flag?"最新":"最热"
      }
    },
		data() {
			return {
        input:"",
        hotItems:[],
        newItems:[],
        flag:true,//true显示hot否则显示new
        pageSize:5,
        total:1,
			}
		},
		onLoad() {
      this.getShows(1)
		},
		methods: {
      gotoSearch(){
        uni.navigateTo({
          url: `/pages/search?input=${encodeURIComponent(JSON.stringify(this.input))}`
        });
      },
      getShows(current){
        let kind=this.flag?0:1
        itemApi.getNewOrHotItems(kind,current).then(res=>{
          this.pageSize=res.data.pageSize
          this.total=res.data.total
          if(this.flag)
            this.hotItems=res.data.items
          else
            this.newItems=res.data.items
          console.log(this.hotItems)
          console.log(this.newItems)
          console.log(1)
          showsOpe.getHeadImages(res.data.items).then(shows=>{
            if(this.flag)
              this.hotItems=shows
            else
              this.newItems=shows
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      },
      changeShows(){
        this.flag=!this.flag
        this.pageSize=5
        this.total=1
        this.getShows(1)
      }
		}
	}
</script>

<style>
</style>
