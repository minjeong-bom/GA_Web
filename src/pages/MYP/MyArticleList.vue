<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import CommentUI from "components/comment/commentUI.vue";
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
      nickname: '',
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
    this.getDetailUserInfo();
  },
  methods: {
    async getDetailUserInfo() {
      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key2: 'IYETRHFC',
            bc_title: this.storageUserKey,
          },
          limit: 1
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }
      const res = await this.$api.post(config.url, config.body, config.etc);
      if (res) {
        const result = res.data.response.lists[0].bc_content;
        this.nickname = result.user_info.nickname;
      } else {
        this.nickname = localStorage.getItem('userId');
      }
    },
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
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
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
    <section v-if="articleList.length > 0" class="nomal-page-layout">
      <div v-for="article in articleList">
        <my-article-card
          :articke-key="article.bc_key"
          :category-name="article.category_name"
          :count-number="article.bc_count"
          :created-at="article.bc_regdate"
          :is-loading="isLoading"
          :thumbnail-key="article.bc_content.thumbnailKey"
          :title-text="article.bc_content.title"
        />
      </div>
    </section>
    <div v-else class="center-graphic-layout">
      <!-- 이미지 -->
      <img src="../../assets/graphic/graphic-edit-imoji.png">

      <!-- 캡션 -->
      <p class="cus-text-2">
        <span class="high-light">{{ nickname }}</span>님의 경험과 이야기를<br>
        공유해주세요.
      </p>
      <p class="cus-text-2">
        사소한 이야기라도 다른 사람들과<br>
        나누고 공감하다 보면<br>
        삶에 변화가 일어날 거에요!<br>
      </p>
    </div>
  </div>
</template>

<style scoped>
.center-graphic-layout {
  gap: 1.62rem;
}
</style>
