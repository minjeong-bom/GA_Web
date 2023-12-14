<script>
export default {
  name: "MyrCard",
  props: {
    cardHeadLine: String,
    cardTitle: String,
    cardThumbNameImgaeName: String,
    cardDescription: String,
    cardCaption: String,
  }
}
</script>

<template>
  <div class="input-card-wrap">
    <div class="flex-sb full-width">
      <h3 class="headline-3">{{ cardHeadLine }}</h3>
      <q-btn
        dense
        flat
        round
        icon="add"
        style="color: var(--labels-secondary)"
      />
    </div>
    <div class="input-card">
      <img :src="`src/assets/graphic/${cardThumbNameImgaeName}.png`"/>
      <div>
        <p class="input-card-title sub-title-1">
          {{ cardTitle }}
        </p>
        <p class="input-card-body">
          {{ cardDescription }}<br>
          <span v-if="cardCaption" class="caption-3">{{ cardCaption }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 5px;
  width: 100%;
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

.input-card {
  padding: 12px;
  border: 1px solid #CDCDCD;
  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 0.625rem;
  border: 1px solid #CDCDCD;
}

.input-card-title {
  margin-bottom: 0.31rem;
}

.input-card-wrap {
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.21875rem */
  letter-spacing: -0.01875rem;
}

.input-card img {
  width: 4.75rem;
  height: 4.75rem;
}
</style>
