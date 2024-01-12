<template>
  <div>
    <div class="card">
      <!-- Card Id -->
      <article-id
        :article-key="articleKey"
        :article-type="articleType2"
        :article-type2="articleType2"
        :control-ui="true"
        :created-at="createdAt"
        :creater-key="createrKey"
        :creater-name="writer"
        :job-title="badgeTitle"
        :user-key="storageUserKey"
        :view-count="viewCount"
      />
      <!-- Thumbnail & Title -->
      <div v-if="fileObject64" class="article-card-thumbnail flex-center article-white-card">
        <img :src="'data:image/jpeg;base64,' + fileObject64" @click="goToArticle(articleKey)"/>
        <div class="overlay-headline" @click="goToArticle(articleKey)">
          <div class="article-card-headline-wrap">
            <h4 class="article-card-headline">{{ titleText42 }}</h4>
          </div>
        </div>
      </div>
      <div v-else class="article-white-card">
        <div class="article-card-headline-wrap" @click="goToArticle(articleKey)">
          <h4 class="article-card-headline">{{ titleText42 }}</h4>
        </div>
      </div>
      <!-- Likes & Comment -->
      <div class="like-read-wrap">
        <!--        <section>-->
        <!--          <q-icon name="sentiment_satisfied_alt" size="18px"></q-icon>-->
        <!--          <span>{{ motivation ? 0 }}</span>-->
        <!--        </section>-->

        <section>
          <span>조회</span>
          <span>{{ viewCount }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleId from 'components/card/ArticleId.vue';
import article from '../../pages/Article.vue';

export default {
  components: { ArticleId },
  props: {
    articleKey: String,
    title: String,
    articleType: String,
    articleType2: String,
    createrKey: String,
    writer: String,
    badgeTitle: String,
    createdAt: String,
    description: String,
    writerThumb: String,
    articleThumb: String,
    motivation: String,
    viewCount: String,
    thumbnailKey: String,
  },
  data() {
    return {
      fileObject64: '',
      isLoading: true,
    };
  },
  created() {
    this.getThumbnail();
  },
  methods: {
    goToArticle(articleId) {
      this.$router.push({ path: '/article', query: { key: articleId } });
    },
    async getThumbnail() {
      if (this.thumbnailKey) {
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
        const response = res.data.response.view.bc_content;
        this.fileObject64 = response;
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    },

  },
  computed: {
    article() {
      return article;
    },
    titleText42() {
      if (this.title.length > 42) {
        return this.title.substring(0, 42);
      }
      return this.title;

      const testing = {
        bc_content: '/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAA',
        bc_count: '0',
        bc_foreign_key: 'FHGBWGLF',
        bc_foreign_key2: 'UZPWQOWR',
        bc_key: 'URQAOBBW',
        bc_regdate: '2023-12-21 16:31:55',
        bc_title: 'articleImage',
        bc_writer_name: 'NKDRTZPV',
      };
    },
    storageUserKey() {
      return localStorage.getItem('userKey');
    },
  },
};
</script>

<style scoped>
.card {
  padding-bottom: 0.38rem;
}

.article-white-card {
  position: relative;
  width: 100%;
  height: 12.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
}

.linear-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 115.35%);
}

.article-card-headline-wrap {
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.625rem;
}

.like-read-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.2rem;
  padding-left: 0.3rem;
}

.like-read-wrap section {
  display: flex;
  height: 1.5rem;
  align-items: center;
  gap: 0.0625rem;
}

.like-read-wrap section * {
  color: #999999;
}

.article-card-thumbnail {
  width: 100%;
  overflow: hidden;
  height: 12.25rem;
  background-color: #fff;
}

.article-card-thumbnail img {
  width: 100%;
}

.overlay-headline {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 50%, #000 115.35%);
}

.overlay-headline .article-card-headline {
  color: #fff;
}
</style>
