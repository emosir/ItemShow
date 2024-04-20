<template>
  <view>
    <text>{{message.topic}}</text>
    <carousel :image-paths="message.imagePaths"></carousel>
    <view>
      <text>{{message.description}}</text>
    </view>
    <text @click="gotoFile">附件</text>
    <text>{{message.time}}</text>
  </view>

</template>


<script>
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
import showsOpe from "../../common/showsOpe";
import fileApi from "../../api/file";
import Carousel from "../../component/common/Carousel.vue";

export default {
  name: "messageRecipient",
  components: {Carousel},
  data(){
    return{
      message:{}
    }
  },
  onLoad(option){
    this.message=JSON.parse(decodeURIComponent(option.message))
    showsOpe.getHeadImage(this.message).then(res=>{
      this.message=res
    }).catch(err=>{
      console.log(err)
    })
    showsOpe.getRestImages(this.message).then(res=>{
      this.message=res
    }).catch(err=>{
      console.log(err)
    })
    if(this.message.fileId){
      fileApi.download(this.message.id).then(res=>{
        this.message.filePath=res
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  methods:{
    gotoFile(){
      uni.openDocument({
        filePath:this.message.filePath
      })
    }
  }
}
</script>


<style scoped lang="scss">

</style>