<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import CommentUI from "components/comment/commentUI.vue";
import TimeAgo from "../../script/timeData/timeAgo";
import timeAgo from "../../script/timeData/timeAgo";
import MyArticleCard from "components/card/myArticleCard.vue";

export default {
  name: "MyArticleList",
  components: {
    MyArticleCard,
    CommentUI,
    TitleTopBar
  },
  data() {
    return {
      articleList: [],
      isLoading: true,
      thumbList: [
        {
          articleKey: '',
          base64File: '',
        }
      ]
    }
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      try {
        const config = {
          url: '/api/crud/lists/?order=desc_bc_regdate',
          data: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
            columns_opts: {
              bc_foreign_key2: 'SNXKQEZS',
              bc_title: this.storageUserKey,
            },
            limit: 100
          },
          etc: {
            headers : {
              'SPRINT-API-KEY' : 'sprinttest',
            }
          }
        }

        // API 호출
        const res = await this.$api.post(config.url, config.data, config.etc);
        let response = res.data.response.lists;

        // 카테고리 이름 삽입
        const categoryInfo = {
          DPORHCPV: '스토리',
          KWUOXKGM: '취업 스킬',
          CEZTXGLJ: '지애픽'
        }

        response.forEach(item => {
          item.category_name = categoryInfo[item.bc_foreign_key] || null;
        })

        this.articleList = response;
      } catch (e) {
        console.error('게시글이 존재하지 않습니다.', e)
      }
    },
  },
  computed: {
    storageUserKey() {
      return localStorage.getItem('userKey');
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="내 게시글"/>
    <section class="nomal-page-layout">
      <div v-for="article in articleList">
        <my-article-card
          :articke-key="article.bc_key"
          :created-at="article.bc_regdate"
          :category-name="article.category_name"
          :title-text="article.bc_content.title"
          :is-loading="isLoading"
          :thumbnail-key="article.bc_content.thumbnailKey"
          :count-number="article.bc_count"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
