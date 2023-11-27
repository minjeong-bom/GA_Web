<script>
import { ref, watch } from 'vue'
export default {
  props: {
    noticeCard: Array,
  },
  setup () {
    return {
      slide: ref(0)
    }
  }
}
</script>

<template>
  <div style="position: relative">
    <q-carousel
      v-model="slide"
      swipeable
      infinite
      height="96px"
      class="rounded-borders"
      style="margin-bottom: 10px"
    >
      <q-carousel-slide v-for="(item, index) in noticeCard" :name="index" class="notice-card-item column no-wrap flex-center">
        <div class="notice-card-title">{{ item.title }}</div>
        <div class="notice-card-caption">{{ item.description }}</div>
        <div class="page-nation">
          <button v-for="(item, buttonIndex) in noticeCard"
                  :class="{'focused': index === buttonIndex, 'page-nation-button': true}"
                  @click="slide = buttonIndex"
          >
          </button>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style scoped>
.notice-card-title,
.notice-card-caption {
  text-align: left;
}

.notice-card-title {
  color: var(--grays-gray);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.notice-card-caption {
  color: var(--grays-gray);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.notice-card-item {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--q-secondary);
}

.page-nation {
  position: absolute;
  left: 0;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.page-nation-button {
  padding: 0;
  width: 6px;
  height: 6px;
  background: none;
  border: 0.3px solid #8E8E93;
  border-radius: 5px;
}

.focused {
  background: #8E8E93;
}
</style>
