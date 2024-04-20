<template>
  <uni-list v-for="message in messages">
    <uni-list-item
        :title="`${message.topic} (${message.state === 0 ? '未读' : '已读'})`"
        clickable
        @click="gotoMessageRecipient(message)"
        :right-text="message.time">
    </uni-list-item>
  </uni-list>
</template>

<script>
  import UniListItem from "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";

// {
//   "id": "mess34dfds",
//   "sender": "userwx2341ds",
//   "recipient": "userwx45ff",
//   "topic": "this is a topic",
//   "time": "2024-5-2",
//   "description": "this is a description",
//   "fileId": "file21dsa",
//   "imageIds": [
//     "imag23dsgds",
//     "imag88wssx"
//   ],
//   "state": 0
// }
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
        url: `/pages/eventAndMessage/messageRecipient?message=${encodeURIComponent(JSON.stringify(message))}
      });
    }
  }
}
</script>

<style scoped lang="scss">

</style>