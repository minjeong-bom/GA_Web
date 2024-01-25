<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import MyBookmarkCard from "components/card/myBookmarkCard.vue";
import MyArticleCard from "components/card/myArticleCard.vue";
import {itemDelete} from "src/script/api/deleteCall";

export default {
  name: "MYP3000",
  components: {MyArticleCard, MyBookmarkCard, TitleTopBar},
  data() {
    return {
      bookmarks: [],
      articles: [],
    }
  },
  mounted() {
    this.getBookmarkPage();
  },
  computed: {
    userName() {
      return localStorage.getItem('userName')
    },
    userKey() {
      return localStorage.getItem('userKey')
    }
  },
  methods: {
    navigateToHome(queryKey) {
      this.$router.push({
        path: '/',
        query: {
          tab: queryKey
        }
      });
    },
    async getBookmarkPage() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_key,bc_title,bc_content',
            columns_opts: {
              bc_foreign_key2: 'SWMUCCYD',
              bc_foreign_key: 'LBUSDDGP',
              bc_title: this.userKey,
            },
            limit: 100
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const result = await this.$api.post(config.url, config.body, config.etc);
        this.bookmarks = result.data.response.lists;

        for (let i = 0; this.bookmarks.length > i; i++) {
          await this.getArticleContent(this.bookmarks[i].bc_key, this.bookmarks[i].bc_content);
        }
      } catch (e) {
        this.articles = [];
      }
    },
    async getArticleContent(bookmarkKey, articleKey) {
      this.isLoading = true;
      try {
        const config = {
          url: '/api/crud/single/' + articleKey,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc)
        this.isLoading = false;
        if (res) {
          const content = res.data.response.view
          if (content.bc_foreign_key === 'DPORHCPV') {
            content.category_name = '스토리'
          } else if (content.bc_foreign_key === 'KWUOXKGM') {
            content.category_name = '취업 스킬'
          } else if (content.bc_foreign_key === 'CEZTXGLJ') {
            content.category_name = '지애픽'
          }
          content.bookmark_key = bookmarkKey;
          content.isShow = true;

          this.articles.push(content);
          this.isLoading = false;
        }

        console.log(this.articles);
      } catch (e) {
        // 404 등 에러일 경우
        await itemDelete(bookmarkKey);
        this.isLoading = false;
      }
    },
    removeBookmark(bookmarkKey) {
      const article = this.articles.find(article => article.bookmark_key === bookmarkKey);
      if (article) {
        article.isShow = false;
      }
    },
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="내 북마크"/>
    <section v-if="articles.length > 0" class="nomal-page-layout">
      <div v-for="article in articles">
        <my-bookmark-card
          v-show="article.isShow"
          :articke-key="article.bc_key"
          :bookmark-key="article.bookmark_key"
          :category-name="article.category_name"
          :count-number="article.bc_count"
          :created-at="article.bc_regdate"
          :is-loading="isLoading"
          :thumbnail-key="article.bc_content.thumbnailKey"
          :title-text="article.bc_content.title"
          @deleteDone="removeBookmark"
        />
      </div>
    </section>
    <section v-else class="mb-64">
      <div class="center-graphic-layout">
        <!-- 이미지 -->
        <img alt="북마크 아이콘" src="../../assets/graphic/graphic-bookmark.png">

        <!-- 캡션 -->
        <p class="cus-text-2">
          {{ userName }}님<br>
          도움이 될만한 콘텐츠를 북마크 해보세요.<br>
          나의 보물창고가 될지도 몰라요.<br>
        </p>
      </div>

      <div class="flex-center l-column button-list">
        <div class="button-group l-column">
          <p class="lable-2">회원들의 경험담을 들을 수 있는</p>
          <q-btn
            class="primary-btn" flat
            label="스토리로 보러가기"
            rounded
            @click="navigateToHome(2)"
          />
        </div>
        <div class="button-group l-column">
          <p class="lable-2">일을 지속하는 데 도움되는</p>
          <q-btn
            class="primary-btn" flat
            label="취업 스킬 보러가기"
            rounded
            @click="navigateToHome(3)"
          />
        </div>
        <div class="button-group l-column">
          <p class="lable-2">굿앺터눈 서비스가 추천하는</p>
          <q-btn
            class="primary-btn" flat
            label="지애픽 보러가기"
            rounded
            @click="navigateToHome(4)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.center-graphic-layout {
  gap: 1rem;
}

.button-list {
  gap: 1.88rem;
}

.button-group {
  gap: 0.31rem;
}

.lable-2 {
  color: #8E8E93;
}

.mb-64 {
  margin-bottom: 64px;
}
</style>
