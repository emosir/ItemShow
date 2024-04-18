<template>
  <view class="container">
    <view class="section" v-for="(position, index) in positions" :key="index">
      <view class="section-header" @click="toggle(index)">
        <view class="section-title">{{ position.title }}</view>
        <view class="arrow">{{ position.expanded ? '▼' : '▲' }}</view>
      </view>
      <view v-if="position.expanded" class="section-content">
        <view class="list-item" v-for="(option, i) in position.options" :key="i">
          <view class="item-title">{{ option.name }}</view>
          <button class="submit-btn">{{ option.action }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "memberList",
  data() {
    return {
      positions: [
        {
          title: "团队成员 - leader/技术",
          expanded: false,
          options: [
            { name: "技术", action: "查看" },
            // 其他选项...
          ]
        },
        // 其他部分...
      ]
    };
  },
  methods: {
    toggle(index) {
      this.positions[index].expanded = !this.positions[index].expanded;
      // 如果您希望同时只展开一个部分，可以加上以下代码
      this.positions.forEach((position, i) => {
        if (i !== index) position.expanded = false;
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #EFEFEF;
  border-top: 1px solid #CCCCCC;
}
.section-title {
  font-size: 16px;
}
.arrow {
  font-size: 12px;
}
.section-content {
  padding: 10px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #CCCCCC;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.item-title {
  font-size: 14px;
}
.submit-btn {
  padding: 5px 10px;
  background-color: #FF3B30;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
}
</style>
