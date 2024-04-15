<template>
  <view style="display: flex">
    <text>{{platStatic.platName}}</text>
    <uni-search-bar :radius="100" @confirm="gotoSearch" :focus="false" v-model="input" placeholder="搜索..."></uni-search-bar>
  </view>
</template>

<script>
import platStatic from "../common/platStatic";

export default {
  name: "searchBar",
  data(){
    return{
      input:"",
    }
  },
  computed:{
    platStatic() {
      return platStatic
    },
  },
  onLoad(option) {
    this.input = option.input;
    this.search(this.input);
  },
  methods:{
    gotoSearch(){
      uni.navigateTo({
        url: `/pages/search?input=`+this.input
      });
    },
  }
}
</script>

<style scoped lang="scss">

</style>