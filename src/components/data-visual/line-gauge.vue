<script>
export default {
  name: "line-gauge",
  props: {
    value: Number,
  }
}
</script>

<template>
  <div class="full-width">
    <div v-if="value" class="percent full-width flex-sb">
      <span class="gauge-value">16<span class="unit">%</span></span>
      <span class="gauge-value">33<span class="unit">%</span></span>
      <span class="gauge-value">50<span class="unit">%</span></span>
      <span class="gauge-value">66<span class="unit">%</span></span>
      <span class="gauge-value">83<span class="unit">%</span></span>
      <span class="gauge-value">100<span class="unit">%</span></span>
    </div>
    <p v-else class="footnote">
      생각 정리와 함께 이력서 작성을 시작해 보세요.
    </p>
  </div>
  <div class="gauge-wrap">
    <div :style="`width: ${value}%;`" class="gauge-fill"></div>
  </div>
</template>

<style scoped>
.gauge-wrap {
  width: 100%;
  height: 16px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(120, 120, 128, 0.16);
}

.gauge-value {
  color: var(--grays-black);
  text-align: right;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.4px;
}

.gauge-value .unit {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 161.538% */
  letter-spacing: -0.4px;
}

.gauge-fill {
  height: 100%;
  background-color: var(--ga-red);
}
</style>
