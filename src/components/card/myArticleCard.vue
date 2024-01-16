<script>
import timeAgo from "../../script/timeData/timeAgo";
export default {
  name: "myArticleCard",
  props: {
    artickeKey: String,
    createdAt: String,
    categoryName: String,
    titleText: String,
    tagsList: String,
    isLoading: {
      type: Boolean,
      default: true,
    },
    thumbnailKey: String,
    countNumber: String,
  },
  data() {
    return {
      thumbLoading: true,
      thumbnailFile: null,
    }
  },
  created() {
    this.getThumbnail();
  },
  methods: {
    async getThumbnail() {
      if (this.thumbnailKey === '') {
        return
      }
      let config = {
        url: '/api/crud/single/' + this.thumbnailKey,
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

      const result = await this.$api.post(config.url, config.body, config.etc);
      const fileSource = result.data.response.view.bc_content;
      this.thumbnailFile = fileSource;
      this.thumbLoading = false;
    },
    goToArticle() {
      this.$router.push({path: '/article', query: {key: this.artickeKey}});
    },
    editArticle() {
      this.$router.push({path: '/article', query: {key: this.artickeKey}});
    },
    deleteArticle() {
      this.$router.push({path: '/article', query: {key: this.artickeKey}});
    }
  },
  computed: {
    createdTime() {
      return timeAgo.timeAgo(this.createdAt)
    },
  },
}
</script>

<template>
  <div class="my-article-card l-column">
    <!-- info : 등록일, 카테고리, more -->
    <div class="my-article-info-wrap row flex-sb">
      <div class="row row-1">
        <span class="caption-2">{{ createdTime }}</span>
        <span class="caption-2 opacity50"> | </span>
        <span class="caption-2">{{ categoryName }}</span>
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
    <div class="content-wrap"  @click="goToArticle()">
      <div class="title-and-tag-wrap">
        <h3 class="ask-card-title">{{ titleText }}</h3>
        <span class="tag-text">{{ tagsList }}</span>
      </div>
      <div v-if="thumbnailKey" class="article-thumbnail">
        <q-skeleton v-if="thumbLoading" type="rect" size="4rem"/>
        <img v-else-if="thumbnailFile" :src="'data:image/jpeg;base64,' + thumbnailFile"/>
      </div>
    </div>
    <!-- 좋아요, count -->
    <div class="row like-and-count caption-1">
      <p>조회 {{ countNumber }}</p>
    </div>
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
