<template>
  <view>
    <search-bar></search-bar>
    <view>
      <text @tap="changeShows">{{displayInfo}}</text>
      <template>
        <overview :shows="displayItems" :pageSize="pageSize" :total="total"></overview>
      </template>
    </view>
  </view>
</template>

<script>
  import itemApi from "../../api/item";
  import Overview from "../../component/overview.vue";
  import showsOpe from "../../common/showsOpe";
  import SearchBar from "../../component/searchBar.vue";
  import imageUpload from "../../component/upload/imageUpload.vue";
  export default {
    components: { imageUpload,SearchBar, Overview},
    computed: {
      displayItems() {
        return this.flag ? this.hotItems : this.newItems;
      },
      displayInfo(){
        return this.flag?"最新":"最热"
      }
    },
		data() {
			return {
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
      //分页获取项目、同时获取图片，
      getShows(current){
        let kind=this.flag?0:1
        itemApi.getNewOrHotItems(kind,current).then(res=>{
          this.pageSize=res.data.data.pageSize
          this.total=res.data.data.total
          if(this.flag)
            this.hotItems=res.data.data.items
          else
            this.newItems=res.data.data.items
          showsOpe.getHeadImages(res.data.data.items).then(shows=>{
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
      //更改要展示的数据，同时获取目标数据的第一页数据
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
