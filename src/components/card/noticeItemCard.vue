<script>
import TimeAgo from "src/script/timeData/timeAgo";

export default {
  name: "noticeItemCard",
  props: {
    titleText: {
      type: String,
      default: '',
    },
    categoryText: {
      type: String,
      default: '',
    },
    createrName: {
      type: String,
      default: '',
    },
    createdDate: {
      type: String,
      default: '',
    },
    thumbnailKey: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      fileObject64: null,
    }
  },
  computed: {
    createdAt() {
      return TimeAgo.timeAgo(this.createdDate);
    },
    categoryName() {
      if (this.categoryText === 'COHDMIOB') {
        return '일반 공지';
      }
      if (this.categoryText === 'NCNZKKMC') {
        return '이벤트';
      }
    }
  },
  mounted() {
    this.getThumbnail();
  },
  methods: {
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
  }
}
</script>

<template>
  <div class="notice-item-card flex-sb">
    <div class="card-text-info-wrap l-column">
      <div>
        <span class="category-text-wrap">{{ categoryName }}</span>
      </div>
      <p class="notice-item-card-title">{{ titleText }}</p>
      <div class="card-caption-2">
        <span>{{ createrName }}</span>
        <span> | </span>
        <span>{{ createdAt }}</span>
      </div>
    </div>
    <div v-if="fileObject64" class="notice-item-thumbnail">
      <img :src="`data:image/jpeg;base64,${fileObject64}`" alt="공지사항 썸네일 영역">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notice-item-card {
  padding: 1.25rem 0;
  border-bottom: 1px solid #E6E6E6;
  cursor: pointer;

  .notice-item-card-title {
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.5625rem; /* 138.889% */
  }

  .notice-item-thumbnail {
    width: 5.125rem;
    height: 5.125rem;

    display: flex;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .card-text-info-wrap {
    width: 14.375rem;
    height: 121px;
    padding-right: 10px;
    gap: 3px;
  }
}
</style>
