<template>
  <view>
    <uni-list v-for="message in messages">
      <uni-list-item
          :title="`${message.topic} (${message.state === 0 ? '未读' : '已读'})`"
          clickable
          @click="gotoMessageRecipient(message)"
          :right-text="message.time">
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script>
  import UniListItem from "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";

  export default {
  name: "userMessageList",
  components: {UniListItem},
  data(){
    return{
      messages:[]
    }
  },
  onLoad(option){
    this.messages=JSON.parse(decodeURIComponent(option.messages))
  },
  methods:{
    gotoMessageRecipient(message){
      uni.navigateTo({
        url: `/pages/eventAndMessage/messageRecipient?message=${encodeURIComponent(JSON.stringify(message))}`
      });
    }
  }
}
</script>

<style scoped lang="scss">

</style>