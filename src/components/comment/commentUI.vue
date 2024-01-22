<script>
import CommentId from 'components/comment/commentId.vue';
import UserProfileThumb from 'components/profile/userProfileTumb.vue';

export default {
  name: 'commentUI',
  components: {
    UserProfileThumb,
    CommentId,
  },
  props: {
    articleKey: String,
    storageUserKey: String,
  },
  data() {
    return {
      addComment: '',
      comments: [],
      editMode: {
        status: false,
        comment_key: null,
      },
    };
  },
  mounted() {
    this.getCommentList();
  },
  methods: {
    async createComment() {
      try {
        if (!this.articleKey) {
          return;
        }

        let config;
        config = {
          url: '/api/crud/setcomment',
          body: {
            data_key: this.articleKey,
            comment_key: null,
            comment_content: this.addComment,
            comment_user_key: this.storageUserKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };

        console.log(config);

        let res = '';
        if (this.editMode.status) {
          config.body.comment_key = this.editMode.comment_key;
          res = await this.$api.post(config.url, config.body, config.etc);

          this.editMode.status = false;
          this.editMode.comment_key = null;
        } else {
          res = await this.$api.post(config.url, config.body, config.etc);
        }
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
          url: `/api/logs/commentlists?foreign_key=${this.articleKey}`,
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };
        const res = await this.$api.get(config.url, config.etc);
        this.comments = res.data.response.lists;
        this.$emit('commentsCount', this.comments.length);
      } catch (e) {
        this.$emit('commentsCount', 0);
        console.error('댓글이 없는 게시글 입니다.', e.message);
      }
    },
    formattedContent(text) {
      return text.replace(/\n/g, '<br>');
    },
    editComment(comment_key, user_key, comment_content) {
      this.editMode.status = true;
      this.editMode.comment_key = comment_key;
      this.addComment = comment_content;
    },
  },
  computed: {
    commentInputPlaceholder() {
      if (this.comments.length === 0) {
        return '첫 댓글을 남겨보세요';
      }
      return '댓글을 남겨보세요';
    },
  },
};
</script>

<template>
  <div>
    <!-- 댓글 추가 영역 -->
    <div class="comment-input-area">
      <!-- profile image -->
      <user-profile-thumb :user-key="storageUserKey" size="36px"></user-profile-thumb>
      <!-- comment input -->
      <q-input v-if="editMode.status" v-model="addComment" :placeholder="commentInputPlaceholder"
               autogrow class="full-width" dense outlined rounded>
        <template v-slot:append>
          <q-btn flat round style="right: -10px" @click="createComment">
            <img alt="전송 아이콘" src="../../assets/icon/ico_arrow-up-cycle.svg" style="width: 20px">
          </q-btn>
        </template>
      </q-input>

      <q-input v-else v-model="addComment" :placeholder="commentInputPlaceholder"
               autogrow class="full-width" dense outlined rounded>
        <template v-slot:append>
          <q-btn flat round style="right: -10px" @click="createComment">
            <img alt="전송 아이콘" src="../../assets/icon/ico_arrow-up-cycle.svg" style="width: 20px">
          </q-btn>
        </template>
      </q-input>
    </div>

    <!-- 댓글 목록 -->
    <section class="l-column comment-list">
      <div v-for="item in comments" class="comment">
        <comment-id :comment-content="item.comment_content"
                    :comment-key="item.comment_key"
                    :created-at="item.comment_regdate"
                    :user-key="item.user_key"
                    :user-position="item.user_data.job"
                    :writer="item.user_title"
                    @editComment="editComment"
                    @reloadList="getCommentList"/>
        <div class="comment-text" v-html="formattedContent(item.comment_content)"></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.comment-input-area {
  display: flex;
  padding: 10px 16px;
  align-items: flex-start;
  gap: 10px;
}

.comment {
  display: flex;
  padding: 10px 16px 0 16px;
  flex-direction: column;
  align-items: flex-start;
}

.comment-list {
  gap: 10px;
  margin-bottom: 52px;
}
</style>
