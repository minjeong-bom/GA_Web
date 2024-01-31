<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import SkeletonLine from "components/loading/SkeletonLine.vue";

export default {
  name: "NOT_0100",
  components: {SkeletonLine, TitleTopBar},
  data() {
    return {
      isLoading: false,
      article: {
        title: '',
        content: '',
        createdAt: '',
        createrName: '',
      },
      thumbnailKey: null,
      fileObject64: null,
    }
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    async getNotice() {
      try {
        this.isLoading = true;
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
        this.thumbnailKey = res.bc_content.thumbnailKey;
        this.article.createrName = res.bc_writer_name;
        this.article.createdAt = res.bc_regdate;

        if (this.thumbnailKey) {
          this.getThumbnail();
        } else {
          this.isLoading = false;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getThumbnail() {
      const config = {
        url: `/api/crud/single/${this.thumbnailKey}`,
        body: {
          prefix: 'bc',
          alias: 'bc',
          scopes: 'bc_content',
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom',
          },
        },
      };

      const res = await this.$api.post(config.url, config.body, config.etc);
      this.fileObject64 = res.data.response.view.bc_content;
      this.isLoading = false;
    },
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
    <title-top-bar :title-text="'공지사항'"></title-top-bar>
    <div class="headline-wrap">
      <!-- headline -->
      <h1 class="article-card-headline">{{ article.title }}</h1>
      <!-- created at -->
      <p class="article-created-at-text">{{ article.createdAt }}</p>
    </div>
    <img :src="`data:image/jpeg;base64,${fileObject64}`" alt="공지사항 썸네일" class="thumbnail-image">
    <!--		v-html=""-->
    <section v-if="isLoading" class="article-content">
      <skeleton-line :lines="4"></skeleton-line>
    </section>
    <section v-else class="article-content" style="min-height: 200px" v-html="article.content"></section>
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
  height: auto;
}

.article-content {
  display: flex;
  padding: 0 1rem 1.25rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
}
</style>
