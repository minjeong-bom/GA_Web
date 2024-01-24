<script>
import {ref} from 'vue'

export default {
  data() {
    return {
      noticeCard: [],
    }
  },
  setup() {
    return {
      slide: ref(0)
    }
  },
  mounted() {
    this.getNoticeList();
  },
  methods: {
    async getNoticeList() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            "alias": "bc",
            "prefix": "bc",
            "scopes": "bc_title,bc_key,bc_content",
            "columns_opts": {
              "bc_foreign_key2": "AOGLJYFD" // 공지사항
            },
            "limit": 3
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }

        const response = await this.$api.post(config.url, config.body, config.etc);
        let res = response.data.response.lists;

        this.noticeCard = res;
        // 설명 텍스트 가공하는 함수 호출
        this.addDescription(res);
      } catch (e) {
        console.error(e);
      }
    },
    addDescription(array) {
      const dataArray = array;

      // DOMParser 인스턴스 생성
      const parser = new DOMParser();

      // 각 객체에 대해 bc_content의 innerText를 추출하여 description 키에 추가
      dataArray.forEach(item => {
        const doc = parser.parseFromString(item.bc_content.content, 'text/html');
        let textContent = doc.body.textContent || "";
        item.description = textContent.length > 42 ? textContent.substring(0, 42) + '...' : textContent;
      });
    },
    goToDetailView(id) {
      this.$router.push({path: '/not0100', query: {key: id}});
    }
  },
}
</script>

<template>
  <div style="position: relative">
    <q-carousel
      v-model="slide"
      class="rounded-borders"
      height="96px"
      infinite
      style="margin-bottom: 10px"
      swipeable
    >
      <q-carousel-slide v-for="(item, index) in noticeCard" :name="index"
                        class="notice-card-item column no-wrap flex-center" @click="goToDetailView(item.bc_key)">
        <div class="notice-card-title">{{ item.bc_title }}</div>
        <div class="notice-card-caption">{{ item.description }}</div>
        <div v-if="noticeCard.length > 1" class="page-nation">
          <button v-for="(item, buttonIndex) in noticeCard"
                  :class="{'focused': index === buttonIndex, 'page-nation-button': true}"
                  @click="slide = buttonIndex"
          >
            <span v-if="false">{{ item }}</span>
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
  border: 1px solid #8E8E93;
  border-radius: 5px;
}

.focused {
  background: #8E8E93;
}
</style>
