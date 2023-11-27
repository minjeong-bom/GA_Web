<script>
import { ref, watch } from 'vue'
export default {
  props: {
    eventList: Array,
  },
  setup () {
    return {
      slide: ref(0)
    }
  }
}
</script>

<template>
  <div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
      height="52px"
      class="rounded-borders"
      style="margin-bottom: 12px"
    >
      <q-carousel-slide v-for="(item, index) in eventList" :name="index" class="event-card-item column no-wrap flex-center">
        <div class="event-card-title">
          {{ item.title }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style scoped>
.event-card-title {
  color: var(--grays-gray);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.event-card-item {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: var(--q-secondary);
}
</style>
