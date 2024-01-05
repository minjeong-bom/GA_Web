<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  name: "MYP4001",
  components: {TextButtonTopBar, TitleTopBar},
  data () {
    return {
      askList: [],
    }
  },
  mounted() {
    this.getAskList();
  },
  methods: {
    createAsk() {
      this.$router.push('/myp4110');
    },
    async getAskList() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            alias : 'bc',
            prefix : 'bc',
            scopes : 'bc_title,bc_regdate,bc_writer_name,bc_key,bc_content',
            columns_opts : {
              bc_foreign_key  : 'IOZOZWFG',
              bc_foreign_key2  : 'ZRBTGTEX',
              bc_title : this.storageUserKey,
            }
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprinttest',
            }
          }
        }

        const res = await this.$api.post(config.url, config.body, config.etc);
        const result = res.data.response.lists;
        this.askList = result.map(item => {
          try {
            const regdate = item.bc_regdate;
            const key = item.bc_key;
            const contentWrapper = JSON.parse(item.bc_content);
            return {
              bc_regdate: regdate,
              bc_key: key,
              bc_content: JSON.parse(contentWrapper),
            }
          } catch (error) {
            console.error('JSON parsing error:', error);
            return {}; // 오류 발생 시 처리
          }
        });

      } catch (e) {
        console.error('등록된 글이 없습니다', e);
      }
    },
    navigateToAsk(askKey) {
      this.$router.push({ path: '/myp4100', query: {key: askKey} });
    }
  },
  computed: {
    storageUserName() {
      return localStorage.getItem('userName');
    },
    storageUserKey() {
      return localStorage.getItem('userKey');
    },
  }
}
</script>

<template>
  <div>
    <text-button-top-bar title-text="1:1 문의 사항" button-name="문의하기" @action="createAsk"/>

    <section class="nomal-page-layout">

      <!-- 나의 문의 목록 -->
      <section v-if="askList" class="ask-card-list l-column">
        <div v-for="item in askList" class="ask-card-item" @click="navigateToAsk(item.bc_key)">
          <div class="flex-sb">
            <div class="l-column ask-card-text">
              <p class="card-headline-1">{{ item.bc_content.title }}</p>
              <p class="caption-1">{{ item.bc_regdate }}</p>
            </div>
            <p class="caption-1">{{ item.bc_content.status === '0' ? '확인중' : '답변완료' }}</p>
          </div>
        </div>
      </section>


      <!-- 문의한게 없을 경우 -->
      <div v-else class="center-graphic-layout">
        <!-- 이미지 -->
        <img src="../../assets/graphic/graphic-edit-imoji.png">

        <!-- 캡션 -->
        <p class="cus-text-2">
          <span class="high-light">
          {{ storageUserName }}
          </span>
          님이 문의하시는 내용<br>
          확인할 수 있어요.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.center-graphic-layout {
  gap: 1rem;
}

.ask-card-text {
  gap: 6px;
}

.ask-card-item {
  padding: 1.25rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;

  border-bottom: 1px solid #E6E6E6;
}
</style>
