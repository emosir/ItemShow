<template>
  <view>
    <view v-for="show in shows" :key="show.id" >
      <uni-card  :title="show.name" :thumbnail="show.imagePath[0]" clickable link @tap="gotoShow(show)">
        <text>{{show.description}}</text>
      </uni-card>
    </view>
    <uni-pagination :show-icon="true" :total=total :current=current :pageSize=pageSize @tap="changePage"></uni-pagination>
  </view>

</template>


<script>
import stringOpe from "../../common/stringOpe";

export default {
  name: "overview",
  props:['shows','total','pageSize'],
  data(){
    return{
      current:1,
    }
  },
  methods: {
    gotoShow(show) {
      const type = stringOpe.checkId(show.id);
      const showType = ["userShow", "itemShow", "teamShow"][type];
      if (!showType) {
        console.log("id错误，overview/43");
        return;
      }
      uni.navigateTo({
        url: `/pages/show/${showType}?show=${encodeURIComponent(JSON.stringify(show))}`
      });
    },
    changePage(params) {
      this.current = params.current;
      this.$parent.getShows(this.current)
    }
  }
}
</script>


<style scoped>
</style>