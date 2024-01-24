<script>
export default {
  name: "MyrInfoCard",
  props: {
    cardHeadLine: String,
    results: {
      type: Array,
      default: [],
    },
    itemLength: Number,
  },
}
</script>

<template>
  <div class="myr-info-card-layout">
    <div class="flex-sb full-width">
      <h3 class="headline-3">{{ cardHeadLine }}</h3>
      <q-btn dense flat icon="add" round style="color: var(--labels-secondary)"/>
    </div>
    <div class="myr-info-card-wrap">
      <div v-for="item in results" v-if="itemLength">
        <p v-for="index in itemLength" v-show="item.result[index - 1]" class="tag-group-title">{{ item.result[i] }}</p>
        <p class="caption-1">{{ item.name }}</p>
      </div>
      <div v-for="item in results" v-else>
        <p class="tag-group-title">{{ item.result }}</p>
        <p class="caption-1">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myr-info-card-layout {
  width: 100%;
}

.myr-info-card-wrap {
  width: 100%;

  display: flex;
  padding: 0.6875rem 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;

  border-radius: 0.625rem;
  border: 1px solid #CDCDCD;
  background: #fff;

}

.headline-3 {
  display: flex;
  align-items: center;
  gap: 5px;

  color: var(--labels-secondary);

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.4px;
}
</style>
