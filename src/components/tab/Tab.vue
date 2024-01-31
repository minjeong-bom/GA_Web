<template>
  <div>
    <div class="tab">
      <!-- 탭 -->
      <div v-for="tab in tabs" :key="tab.id" :class="{ 'tab-focus' : tab.id === activeTab }" class="tab-item"
           @click="selectTab(tab.id)">
        {{ tab.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    tabs: {
      type: Array,
      default: [],
    },
    defaultTab: {
      type: String,
      default: 0,
    }
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  mounted() {
    this.activeTab = this.defaultTab || 0;
    this.selectTab(this.defaultTab);
  },
  methods: {
    selectTab(tabId) {
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
  font-size: 21px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;

  padding: 6px 6px 2px;
  border-bottom: 2px solid #fff;
  transition: all 0.5s;

  cursor: pointer;
}

.tab-focus {
  color: #FD384E;
  border-bottom: 2px solid #FD384E;
}
</style>
