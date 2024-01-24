<script>
export default {
  name: "MyrCard",
  props: {
    cardHeadLine: String,
    cardTitle: String,
    cardThumbNameImgaeName: String,
    uploadPhoto: String,
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
        icon="add"
        round
        style="color: var(--labels-secondary)"
      />
    </div>
    <div v-if="uploadPhoto" class="input-card full-width">
      <div>
        <img :src="'data:image/jpeg;base64,' + uploadPhoto" alt="프로필 이미지 미리보기" class="profile-image"/>
      </div>
    </div>
    <div v-else class="input-card">
      <img :alt="`${cardThumbNameImgaeName} 아이콘`" :src="`src/assets/graphic/${cardThumbNameImgaeName}.png`"/>
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

.input-card {
  width: 100%;
  padding: 12px;
  border: 1px solid #CDCDCD;
  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 0.625rem;
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

.profile-image {
  width: 30% !important;
  height: auto !important;
  border-radius: 4px;
}
</style>
