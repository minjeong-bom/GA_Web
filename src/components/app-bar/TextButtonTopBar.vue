<script>
export default {
  props: {
    buttonName: String,
    titleText: String,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<template>
  <div class="text-button-top-bar">
    <!-- 뒤로가기 버튼 -->
    <q-btn flat round>
      <q-icon name="navigate_before" @click="goBack"></q-icon>
    </q-btn>
    <h2>{{ titleText ? titleText : "" }}</h2>
    <q-btn class="top-bar-button" flat round style="color: var(--ga-red)" @click="$emit('action')">
      <p style="color: var(--ga-red)">{{ buttonName }}</p>
    </q-btn>
  </div>
</template>

<style scoped>
.text-button-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;
  background: transparent;
  padding-right: 16px;
}

h2 {
  color: var(--k-85);
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.top-bar-button {
  font-size: 14px;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.4px;
}
</style>
