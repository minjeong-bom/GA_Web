<script>
import {ref, watch} from 'vue'

export default {
  data() {
    return {
      eventList: [],
    }
  },
  setup() {
    return {
      slide: ref(0)
    }
  },
  mounted() {
    this.getEventList();
  },
  methods: {
    async getEventList() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            "alias": "bc",
            "prefix": "bc",
            "scopes": "bc_title,bc_key",
            "columns_opts": {
              "bc_foreign_key2": "RCKOKHAZ" // 이벤트
            },
            "limit": 5
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }

        const response = await this.$api.post(config.url, config.body, config.etc);
        let res = response.data.response.lists;
        this.eventList = res;
      } catch (e) {
        console.error(e);
      }
      // 작성자명 가공 함수 호출
    },
    goToDetailView(id) {
      this.$router.push({path: '/eve0100', query: {key: id}});
    },
  }
}
</script>

<template>
  <div>
    <q-carousel
      v-model="slide"
      animated
      class="rounded-borders"
      height="52px"
      infinite
      style="margin-bottom: 12px"
      swipeable
      transition-next="slide-left"
      transition-prev="slide-right"
    >
      <q-carousel-slide v-for="(item, index) in eventList" :name="index"
                        class="event-card-item column no-wrap flex-center" @click="goToDetailView(item.bc_key)">
        <div class="event-card-title">
          {{ item.bc_title }}
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
