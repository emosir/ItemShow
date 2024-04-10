<template>
  <view>
    <template v-for="show in shows" :key="show.id">
      <uni-card  :title="show.name" :thumbnail="show.imagePath[0]">
        <text>{{show.description}}</text>
      </uni-card>
    </template>
    <uni-pagination :show-icon="true" :total=total></uni-pagination>
  </view>

</template>


<script>
export default {
  name: "overview",
  props:['shows'],//父组件传递的参数
  data() {
    return {
      current: 1,
      total: 1,
      pageSize: 5
    }
  },
  mounted() {
    setTimeout(() => {
      this.current = 5
    }, 3000)
  },
  methods: {
    gotoPreview(preview){
      console.log(preview)
      uni.navigateTo({
        url: '/pages/preview/preview?preview='+encodeURIComponent(JSON.stringify(preview))
      });
    },
    add() {
      this.total += 10
    },
    reset() {
      this.total = 0
      this.current = 1
    },
    change(e) {
      console.log(e)
      this.current = e.current
    }
  }
}
</script>


<style scoped>
</style>