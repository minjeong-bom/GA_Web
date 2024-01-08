<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import CommentUI from "components/comment/commentUI.vue";

export default {
  name: "MYP_4100",
  components: {
    CommentUI,
    TitleTopBar
  },
  data() {
    return {
      headline: '',
      createdAt: '',
      userContent: '',
      adminContent: {
        adminKey: '',
        adminProfileImage: '',
      },
      isLoading: '',
    }
  },
  mounted() {
    this.getAskContent();
  },
  methods: {
    async getAskContent() {
      try {
        const config = {
          url: '/api/crud/single/' + this.contentKey,
          body: {
            prefix : 'bc',
            alias : 'bc',
            scopes : 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content'
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        console.log(res.data.response.view);
        const result = res.data.response.view;
        this.createdAt = result.bc_regdate;

        const contentWrapper = JSON.parse(result.bc_content);
        const content = JSON.parse(contentWrapper)

        console.log(content)
        this.headline = content.title;
        this.userContent = content.ask;
        this.adminContent = content.question;
      } catch (e) {

      }
    }
  },
  computed: {
    storageUserKey() {
      return localStorage.getItem('userKey');
    },
    contentKey() {
      return this.$route.query.key;
    },
    formattedContent() {
      return this.userContent.replace(/\n/g, '<br>');
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar/>
    <section class="nomal-page-layout">
      <!-- 사용자 등록 질문 -->
      <h4 class="article-card-headline">{{ headline }}</h4>
      <p class="caption-1">{{ createdAt }} 문의</p>
      <div class="article-content">
        <p v-html="formattedContent"></p>
      </div>

      <!-- 관리자 등록 답변 -->
      <div>
        <!-- 관리자 답변 내용 -->
        <div class="comment-text">
          {{ adminContent ? adminContent : "아직 답변이 등록되지 않았습니다." }}
        </div>
      </div>
    </section>
    <comment-u-i :article-key="contentKey" :storage-user-key="storageUserKey"/>

  </div>
</template>

<style scoped>
.article-content {
  padding: 0;
}
</style>
