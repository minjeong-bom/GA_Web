<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import SkeletonLine from "components/loading/SkeletonLine.vue";
import DDay from "src/script/timeData/dDay";

export default {
  name: "EVE_0100",
  components: {SkeletonLine, TitleTopBar},
  data() {
    return {
      isLoading: false,
      article: {
        title: '',
        content: '',
        createdAt: '',
        createrName: '',
        buttonName: '',
        buttonUrl: '',
        startDay: '',
        endDay: '',
        dDay: '',
      },
    }
  },
  mounted() {
    this.getEvent();
  },
  methods: {
    async getEvent() {
      try {
        const config = {
          url: '/api/crud/single/' + this.contentKey,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content,bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const response = await this.$api.post(config.url, config.body, config.etc);
        const res = response.data.response.view;
        this.article.title = res.bc_title;
        this.article.content = res.bc_content.content;
        this.article.buttonUrl = res.bc_content.buttonUrl;
        this.article.buttonName = res.bc_content.buttonText;
        this.article.startDay = res.bc_content.start;
        this.article.endDay = res.bc_content.end;
        this.article.dDay = DDay.calculateDDay(res.bc_content.end);

        this.article.createrName = res.bc_writer_name;
        this.article.createdAt = res.bc_regdate;
      } catch (e) {
        console.error(e);
      }
    },
    linkTo() {
      window.open(this.article.buttonUrl);
    }
  },
  computed: {
    contentKey() {
      return this.$route.query.key;
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar :title-text="'이벤트'"></title-top-bar>
    <div class="headline-wrap">
      <!-- headline -->
      <h1 class="article-card-headline">{{ article.title }}</h1>
      <!-- created at -->
      <div>
        <span class="d-day-text">{{ article.dDay }}</span><span class="article-created-at-text">{{ article.startDay }} ~ {{
          article.endDay
        }}</span>
      </div>
    </div>
    <img :src="`src/assets/graphic/article-thumbnail-sample.png`" alt="이벤트의 썸네일" class="thumbnail-image">
    <!--		v-html=""-->
    <section v-if="isLoading" class="article-content">
      <skeleton-line :lines="4"></skeleton-line>
    </section>
    <section v-else class="article-content" style="min-height: 200px" v-html="article.content"></section>
    <q-btn class="onboard-fixed-button" flat rounded size="lg" style="background: var(--ga-red)" @click="linkTo()">
      <p style="color: #fff">{{ article.buttonName }}</p>
    </q-btn>
  </div>
</template>

<style scoped>
.headline-wrap {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
}

.article-created-at-text {
  color: #999;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 166.667% */
}

.thumbnail-image {
  width: 100%;
  height: 13.875rem;
  background-size: cover;
}

.article-content {
  display: flex;
  padding: 0 1rem 1.25rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
}

.d-day-text {
  padding: 0.125rem 0.3125rem;
  justify-content: center;
  align-items: center;

  border-radius: 0.1875rem;
  background: #4C4C4C;

  color: #fff;

  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-right: 0.31rem;
}
</style>
