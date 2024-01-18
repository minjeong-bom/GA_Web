<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import NoticeItemCard from "components/card/noticeItemCard.vue";

export default {
  name: "EVE_0000",
  components: {NoticeItemCard, TitleTopBar},
  data() {
    return {
      notices: [],
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
            "scopes": "bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key",
            "columns_opts": {
              "bc_foreign_key2": "RCKOKHAZ" // 이벤트
            },
            "limit": 100
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }

        const response = await this.$api.post(config.url, config.body, config.etc);
        console.log(response);
        let res = response.data.response.lists;

        this.replaceWriterNames(res);
      } catch (e) {
        console.error(e);
      }
      // 작성자명 가공 함수 호출
    },
    async replaceWriterNames(array) {
      for (let item of array) {
        try {
          const res = await this.$api.post(
            `/api/crud/single/${item.bc_writer_name}`,
            {
              prefix: "mem",
              alias: "mem",
              scopes: "mem_title,mem_job"
            },
            {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom',
              }
            }
          )
          if (res.data.status === 'success') {
            item.bc_writer_name = res.data.response.view.mem_title;
            if (res.data.response.view.mem_job) {
              item.badgeTitle = res.data.response.view.mem_job
            } else {
              item.badgeTitle = "일반 회원" // job 정보가 등록되지 않은 회원은 일반 회원으로 표시
            }
          }
        } catch (e) {
          item.badgeTitle = "비공개 회원" // 삭제된 회원
        }
      }
      console.log('array', ...array)
      this.notices = array;
    },
    goToDetailView(id) {
      this.$router.push({path: '/eve0100', query: {key: id}});
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar :title-text="'이벤트'"></title-top-bar>
    <div class="notie-list">
      <h1 class="headline-1">이벤트</h1>
      <section>
        <notice-item-card
          v-for="item in notices"
          :category-text="item.bc_foreign_key"
          :created-date="item.bc_regdate"
          :creater-name="item.bc_writer_name"
          :title-text="item.bc_title"
          @click="goToDetailView(item.bc_key)"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.notie-list {
  padding: 0 16px;
}
</style>
