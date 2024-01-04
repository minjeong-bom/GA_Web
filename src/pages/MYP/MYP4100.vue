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
      contentKey: '',
      isLoading: '',
    }
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
    <title-top-bar/>
    <section class="nomal-page-layout">
      <!-- 사용자 등록 질문 -->
      <h4 class="article-card-headline">궁금합니다.</h4>
      <p class="caption-1">2023.08.01 문의</p>
      <div class="article-content">
        <p>문의 내용</p>
      </div>

      <!-- 관리자 등록 답변 -->
      <div>
        <!-- 관리자 답변 내용 -->
        <div class="comment-text">
          관리자 답변
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
