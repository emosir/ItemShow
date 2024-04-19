<template>
<!--  本组件未受检查，参考https://zh.uniapp.dcloud.io/component/uniui/uni-swiper-dot.html#%E4%BB%8B%E7%BB%8D-->
  <view class="content">
    <swiper class="swiper-box" indicator-dots="true" @change="change">
      <swiper-item v-for="(path, index) in imagePaths" :key="index">
        <image :src="path" class="gallery-image" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    imagePaths: Array
  },
  data(){
    return{
      current:0,
    }
  },
  methods: {
    change(e) {
      this.current = e.detail.current
    }
  }
};
</script>

<style>
.swiper-box {
  height: 200px; /* 根据需要调整 */
}

.gallery-image {
  width: 100%; /* 调整图片宽度以适应轮播容器 */
  height: auto;
  display: block;
}
</style>
