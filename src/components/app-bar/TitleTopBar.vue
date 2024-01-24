<script>
export default {
  props: {
    titleText: String,
    backButton: {
      type: Boolean,
      default: true,
    },
    subText: {
      type: String,
      default: '',
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
}
</script>

<template>
  <div class="title-top-bar flex-sb">
    <div>
      <!-- 뒤로가기 버튼 -->
      <q-icon v-if="backButton" name="arrow_back" size="1.5rem" @click="goBack"></q-icon>
      <!-- 제목 -->
      <h2>{{ titleText ? titleText : "" }}</h2>
    </div>
    <div v-if="subText" class="sub-text-area">
      <span>{{ subText }}</span>
    </div>
  </div>
</template>

<style scoped>
.title-top-bar {
  display: flex;
  height: 4rem;
  padding: 0.5rem 1rem;
  align-items: center;
  flex-shrink: 0;
}

.title-top-bar > div {
  display: flex;
  gap: 1.25rem;
}

h2 {
  color: var(--k-85);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.sub-text-area {
  flex-shrink: 0;
  text-align: right;
}

.sub-text-area span {
  width: 8.4375rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
