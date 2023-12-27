<script>
import CommentId from "components/comment/commentId.vue";

export default {
  name: "commentUI",
  components: {
    CommentId
  },
  props: {
    articleKey: String,
    storageUserKey: String,
  },
  data() {
    return {
      addComment: '',
      comments: [],
    }
  },
  mounted() {
    this.getCommentList();
  },
  methods: {
    async createComment() {
      try {
        const config = {
          url: '/api/crud/setcomment',
          body: {
            data_key : this.articleKey,
            comment_content: this.addComment,
            comment_user_key: this.storageUserKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        if (res.status) {
          this.addComment = '';
          this.getCommentList();
        }
      } catch (e) {
        console.error('댓글 생성 실패');
      }
    },
    async getCommentList() {
      try {
        const config = {
          url: '/api/logs/commentlists?foreign_key=' + this.articleKey,
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.get(config.url, config.etc)
        this.comments = res.data.response.lists;
        this.$emit('commentsCount', this.comments.length);
      } catch (e) {
        this.$emit('commentsCount', 0);
        console.error('댓글이 없는 게시글 입니다.', e.message);
      }
    },
  },
  computed: {
    commentInputPlaceholder() {
      if (this.comments.length === 0) {
        return '첫 댓글을 남겨보세요'
      } else {
        return '댓글을 남겨보세요'
      }
    },
  }
}
</script>

<template>
  <div>
    <!-- create comments -->
    <div class="comment-input-area">
      <!-- profile image -->
      <q-avatar size="40px">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
      <!-- comment input -->
      <q-input dense rounded outlined v-model="addComment" :placeholder="commentInputPlaceholder" style="width: 100%;">
        <template v-slot:append>
          <q-btn flat round @click="createComment" style="right: -10px">
            <img src="src/assets/icon/ico_arrow-up-cycle.svg" style="width: 20px">
          </q-btn>
        </template>
      </q-input>
    </div>
    <!-- comment list -->
    <section class="l-column comment-list">
      <div class="comment" v-for="item in comments">
        <comment-id :writer="item.user_title" :user-position="item.user_data.job" :created-at="item.comment_regdate"/>
        <section class="comment-text">{{ item.comment_content }}</section>
      </div>
    </section>
  </div>
</template>

<style scoped>
.comment-input-area {
  display: flex;
  padding: 10px 16px;
  align-items: center;
  gap: 10px;
}

.comment {
  display: flex;
  padding: 10px 16px 0px 16px;
  flex-direction: column;
  align-items: flex-start;
}

.comment-text {
  width: 100%;
  border-radius: 20px;
  background: var(--fills-quartternary);
  padding: 16px;

  color: #000;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4375rem; /* 135.294% */
}

.comment-list {
  gap: 10px;
  margin-bottom: 52px;
}
</style>
