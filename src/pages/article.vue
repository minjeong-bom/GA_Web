<template>
  <div>
    <div class="article-wrap">
      <!-- 글정보 -->
      <div class="flex article-info">
        <!-- 사진, 작성자, 글 구분, 뱃지, 업데이트 시간 -->
        <div class="article-info-inner-wrap">
          <div class="user-thumbnail-wrap">
            <img class="user-thumbnail" :src="articleList.writerThumb">
          </div>
          <div>
            <!-- 사용자 이름, 글 타입 -->
            <span class="writer writer-1">{{ articleList.writer }}님이 </span>
            <span class="writer writer-2">{{ articleList.articleType }}</span>
            <span class="writer writer-1">을 올렸어요</span><br>
            <!-- 사용자 뱃지 -->
            <span class="badge">
            <i class="fa-solid fa-user-check"></i>
            {{ articleList.badgeTitle }}
          </span>
            <span class="part"> | </span>
            <!-- 작성일 -->
            <span class="created-at">{{ articleList.createdAt }}</span>
          </div>
        </div>
        <!-- 더보기 버튼 -->
        <div class="article-controller">
          <button>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
      <!-- 제목 -->
      <div class="title-wrap">
        <h1>{{ articleList.title }}</h1>
        <p>{{ articleList.description }}</p>
        <p>{{ articleList.createdAtTime }}</p>
      </div>
      <!-- 썸네일 -->
      <div class="article-thumbnail-wrap">
        <img class="article-thumbnail" :src="articleList.articleThumb">
      </div>
      <div class="article-thumb-caption-wrap">
        <p class="article-thumb-caption">{{ articleList.articleCaption }}</p>
      </div>
      <!-- 본문 -->
      <p class="article-content">
        {{ articleList.article }}
      </p>
      <!-- Tag -->
      <div class="tag-wrap">
        <span class="tag" v-for="item in articleList.tags"># {{ item }}</span>
      </div>
    </div>

    <!-- 북마크 & 공유하기 -->
    <section class="control-box">
      <button><i class="fa-regular fa-bookmark"></i>북마크</button>
      <button><i class="fa-solid fa-share-nodes"></i>공유하기</button>
    </section>

    <!-- 반응 영역 -->
    <section class="motivation-wrap">
      <div class="total-count">
        <span class="lable">공감</span>
        <span class="value">{{ articleList.motivation }}</span>
        <span class="lable">∙</span>
        <span class="lable">댓글</span>
        <span class="value">{{ articleList.commentTotal }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import TopBarSub from "components/app-bar/TopBarSub.vue";

export default {
  components: {
    'top-bar': TopBarSub
  },
  data() {
    return {
      articleList: {
        id: "articleId",
        title: "중장년 취업 고민 #1: 경력 미달",
        articleType: "스토리",
        writer: "원준",
        badgeTitle: "취업_전문가",
        createdAt: "1시간전",
        description: "저의 고민은 경력 부족입니다. 젊은 지원자들과 어떻게 경쟁할 수 있을까요?",
        writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
        articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
        motivation: "999",
        viewCount: "999",

        articleCaption: "2022 한국리틀 야구단 올스타전",
        createdAtTime: "2023년 08월 01일 10:15:30",
        article: "안녕하세요. \n" +
          "함께 할 수 있는 분들을 찾고자 글 올려요.\n" +
          "설립 취지를 말씀드릴게요.\n" +
          "1980년대 야구에 대한 관심이 높아지면서\n" +
          "지역별 어린이 야구단이 생겼어요. \n" +
          "\n" +
          "함께 할 수 있는 분들을 찾고자 글 올려요.\n" +
          "설립 취지를 말씀드릴게요.1980년대 야구에 대한 관심이 높아지면서 지역별 어린이 야구단이 생겼어요. 함께 할 수 있는 분들을 찾고자 글 올려요.\n" +
          "설립 취지를 말씀드릴게요.1980년대 야구에 대한 관심이 높아지면서 지역별 어린이 야구단이 생겼어요.  ",
        tags: [
          "태그1", "태그2", "태그3"
        ],
        commentTotal: "12",
      },
    }
  },
  methods : {
  }
}
</script>

<style scoped>
.article-wrap {
  padding: 20px;
}
.user-thumbnail-wrap {
  margin-right: 4px;
  width: 42px;
  height: 42px;
  border-radius: 100px;
  overflow: hidden;
  border: 1px solid #dadada;
}
.user-thumbnail {
  display: flex;
  width: 100%;
  height: auto;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.writer {
  font-size: 1.02rem;
  font-style: normal;
  font-weight: 700;
}
.writer-2 {
  color: #FD384E;
}

.badge {
  color: #938F96;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;
}

.badge i {
  color: #9747FF;
  margin-right: 4px;
}

.part {
  color: #938F96;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;

  opacity: 0.5;
}

.created-at {
  color: #938F96;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;
}

.article-info {
  display: flex;
  justify-content: space-between;
  //margin-bottom: 10px;
}

.article-info-inner-wrap {
  display: flex;
}

.article-controller {
  //width: 24px;
  color: #CAC5CD;
}

.article-controller button {
  border: none;
  background-color: transparent;
  font-size: 24px;
}

.article-thumbnail-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  max-width: 100%;
  max-height: 500px;
  height: auto;
  overflow: hidden;
}

.article-thumbnail-wrap img {
  width: 100%;
}

.article-thumb-caption {
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
  color: #00000099;
}

.article-thumb-caption-wrap {
  padding: 6px 24px;
  display: flex;
  justify-content: center;
}

h1 {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 116.667% */
  margin-block-end: 6px;
}

p {
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.title-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 16px;
  padding-bottom: 10px;
}

.article-content {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 156.25% */
}

.tag-wrap {
  display: inline-flex;
  gap: 4px;
}

.tag {
  color: #9747FF;
  font-size: 14px;
}

.control-box {
  display: flex;
  margin-top: 20px;
}

.control-box button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 44px;

  border: none;
  border-radius: 0;
  gap: 4px;
}

.motivation-wrap {
  padding: 20px;
}

.total-count {
  display: flex;
  gap: 4px;
}

.value {
  color: #FD384E;
}
</style>
