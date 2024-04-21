<template>
  <view>
    <view>
      <text>我发起的事项</text>
      <uni-list v-for="event in initiateEvents">
        <uni-list-item
            :title="`${event.topic} (${event.state === 0 ? '进行中' : '已完结'})`"
            clickable
            @click="gotoEventHandle(event)"
            :right-text="event.startTime">
        </uni-list-item>
      </uni-list>
    </view>
    <view>
      <text>我收到的事项</text>
      <uni-list v-for="event in receiveEvents">
        <uni-list-item
            :title="`${event.topic}(${event.state === 0 ? '进行中' : '已完结'})`"
            clickable
            @click="gotoEventHandle(event)"
            :right-text="event.startTime">
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script>
import UniListItem from "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";


export default {
  name: "userEventList",
  components: {UniListItem},
  data(){
    return{
      receiveEvents:[],
      initiateEvents:[],
    }
  },
  onLoad(option){
    let events=JSON.parse(decodeURIComponent(option.events))
    this.receiveEvents=events.receiveEvents
    this.initiateEvents=events.initiateEvents
  },
  methods:{
    gotoEventHandle(event) {
      if (!event || event.kind === undefined) {
        console.error("Event is undefined or lacks 'kind' property.");
        return;
      }
      let url;
      switch (event.kind) {
        case 0:
          url = `pages/eventAndMessage/agreeTeamApply?event=${encodeURIComponent(JSON.stringify(event))}`;
          break;
        case 1:
          url = `pages/eventAndMessage/agreeTeamInvite?event=${encodeURIComponent(JSON.stringify(event))}`;
          break;
        case 2:
          url = `pages/eventAndMessage/reformShow?event=${encodeURIComponent(JSON.stringify(event))}`;
          break;
      }
    }
  }
}
</script>



<style scoped lang="scss">

</style>