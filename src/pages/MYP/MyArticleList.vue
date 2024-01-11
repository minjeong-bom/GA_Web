<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import CommentUI from "components/comment/commentUI.vue";
import TimeAgo from "../../script/timeData/timeAgo";
import timeAgo from "../../script/timeData/timeAgo";

export default {
  name: "MyArticleList",
  components: {
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
        this.getThumbnail();

      } catch (e) {
        console.error('게시글이 존재하지 않습니다.', e)
      }
    },
    async getThumbnail(key) {
      this.thumbList = [];
      let config = {
        url: '/api/crud/single/' + key,
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_content',
        },
        etc: {
          headers : {
            'SPRINT-API-KEY' : 'sprinttest',
          }
        }
      }

      for (let i = 0; this.articleList.length > i; i++) {
        if (this.articleList[i].bc_content.thumbnailKey) {
          config.url = '/api/crud/single/' + this.articleList[i].bc_content.thumbnailKey;
          const result = await this.$api.post(config.url, config.body, config.etc);
          const fileSource = result.data.response.view.bc_content;
          const imageInfo = {
            articleKey: this.articleList[i].bc_key,
            base64File: fileSource,
          }
          this.thumbList.push(imageInfo);
        }
      };
      this.isLoading = false;
    },
    goToArticle(key) {
      this.$router.push({path: '/article', query: {key: key}});
    },
    getBase64File(articleKey) {
      let foundItem = this.thumbList.find(item => articleKey === item.articleKey);
      return foundItem ? foundItem.base64File : null;
    }
  },
  computed: {
    timeAgo() {
      return timeAgo
    },
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
      <div v-for="article in articleList" class="my-article-card l-column">
        <!-- info : 등록일, 카테고리, more -->
        <div class="my-article-info-wrap row flex-sb">
          <div class="row row-1">
            <span class="caption-2">{{ timeAgo.timeAgo(article.bc_regdate) }}</span>
            <span class="caption-2 opacity50"> | </span>
            <span class="caption-2">{{ article.category_name }}</span>
          </div>
          <q-btn dense flat round icon="more_vert" color="grey">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="editArticle()">
                  <div class="item-section">수정</div>
                </q-item>
                <q-item clickable v-close-popup @click="deleteItem()">
                  <div class="item-section">삭제</div>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <!-- content : 제목, 태그, 썸네일 -->
        <div class="content-wrap"  @click="goToArticle(article.bc_key)">
          <div class="title-and-tag-wrap">
            <h3 class="ask-card-title">{{ article.bc_content.title }}</h3>
            <span class="tag-text">{{ article.bc_content.tags }}</span>
          </div>
          <div v-if="article.bc_content.thumbnailKey" class="article-thumbnail">
            <q-skeleton v-if="isLoading" type="rect" size="100px"/>
            <img v-else-if="getBase64File(article.bc_key)"
                 :src="'data:image/jpeg;base64,' + getBase64File(article.bc_key)"
            />
          </div>
        </div>
        <!-- 좋아요, count -->
        <div class="row like-and-count caption-1">
<!--          <p class="flex-center"><q-icon size="18px" name="sentiment_satisfied_alt"/>999</p>-->
          <p>조회 {{ article.bc_count }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.my-article-card {
  gap: 4px;
}
.row-1 {
  gap: 4px;
  align-items: center;
}

.opacity50 {
  opacity: 0.5;
}

.content-wrap {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
}

.title-and-tag-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.375rem;
  flex: 1 0 0;
  min-height: 78px;
}

.article-thumbnail {
  display: flex;
  width: 4.875rem;
  height: 4.875rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border-radius: 0.5rem;
}

.article-thumbnail>img {
  width: 100%; /* 너비를 컨테이너에 맞춥니다 */
  height: 100%; /* 높이도 컨테이너에 맞춥니다 */
  object-fit: cover; /* 이미지가 컨테이너를 가득 채우도록 조정하면서 종횡비를 유지합니다 */
}

.like-and-count {
  gap: 4px;
  font-size: 16px;
}
</style>
