<template>
  <div>
    <!-- 탭 -->
    <div class="tab">
      <div class="tab-item" v-for="tab in tabs" :key="tab.id" @click="selectTab(tab.id)" :class="{ 'tab-focus' : tab.id === activeTab }">
        {{ tab.title }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    tabs: Array,
  },
  data() {
    return {
      activeTab: 1,
    }
  },
  mounted() {
    this.selectTab(this.activeTab);
  },
  methods: {
    selectTab(tabId) {
      console.log('tab.vue',tabId);
      this.activeTab = tabId;
      this.$emit('changeTab', tabId);
    }
  }
}
</script>

<style scoped>
.tab {
  display: flex;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 8px;
}

.tab-item {
  font-size: 1.31rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;

  padding: 6px;
  padding-bottom: 2px;
  border-bottom: 2px solid #fff;
  transition: all 0.5s;
}

.tab-focus {
  color: #FD384E;
  border-bottom: 2px solid #FD384E;
}
</style>
