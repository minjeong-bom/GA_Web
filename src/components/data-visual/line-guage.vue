<script>
export default {
  name: "line-guage",
  props: {
    value: Number,
  }
}
</script>

<template>
  <div class="full-width">
    <div v-if="value" class="persent full-width flex-sb">
      <span class="guage-value">16<span class="unit">%</span></span>
      <span class="guage-value">33<span class="unit">%</span></span>
      <span class="guage-value">50<span class="unit">%</span></span>
      <span class="guage-value">66<span class="unit">%</span></span>
      <span class="guage-value">83<span class="unit">%</span></span>
      <span class="guage-value">100<span class="unit">%</span></span>
    </div>
    <p v-else class="footnote">
      생각 정리와 함께 이력서 작성을 시작해 보세요.
    </p>
  </div>
  <div class="quage-wrap">
    <div class="quage-fill" :style="`width: ${value}%;`"></div>
  </div>
</template>

<style scoped>
.quage-wrap {
  width: 100%;
  height: 16px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(120, 120, 128, 0.16);
}

.guage-value {
  color: var(--grays-black);
  text-align: right;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.4px;
}

.guage-value .unit {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 161.538% */
  letter-spacing: -0.4px;
}

.quage-fill {
  height: 100%;
  background-color: var(--ga-red);
}
</style>
