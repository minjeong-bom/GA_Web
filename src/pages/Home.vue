<template>
  <q-page class="home">
    <top-bar-main></top-bar-main>
    <!-- 이벤트 베너 -->
    <section class="event-card-list">
      <div class="event-card">
      </div>
    </section>

    <!-- 아티클 카드 -->
    <section>
      <!-- 탭 -->
      <div class="tab">
        <div class="tab-item" :class="{ 'tab-focus' : homeArticleTab === 'All' }" @click="setTabUI('All')">전체</div>
        <div class="tab-item" :class="{ 'tab-focus' : homeArticleTab === 'Story' }" @click="setTabUI('Story')">스토리</div>
        <div class="tab-item" :class="{ 'tab-focus' : homeArticleTab === 'Skill' }" @click="setTabUI('Skill')">취업스킬
        </div>
        <div class="tab-item" :class="{ 'tab-focus' : homeArticleTab === 'Pick' }" @click="setTabUI('Pick')">지애 픽</div>
      </div>

      <div v-for="item in articleList">
        <article-card
          :title="item.title"
          :article-thumb="item.articleThumb"
          :article-type="item.articleType"
          :writer="item.writer"
          :badge-title="item.badgeTitle"
          :created-at="item.createdAt"
          :description="item.description"
          :writer-thumb="item.writerThumb"
          :motivation="item.motivation"
          :view-count="item.viewCount"
        >
        </article-card>
      </div>
      <button class="btn-learn-more">더 보기</button>
    </section>
    <!-- 피드백 -->
    <section class="feed-back-section">
      <img class="sun-animation" src="../assets/graphic/sun-animation.gif">
      <p>G@에 알려주고 싶은 이야기가 있나요?</p>
      <button class="btn-main" @click="linkToServiceComment()">네, 있어요</button>
    </section>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import { useRouter } from "vue-router";
import topBarMain from "components/common/TopBarMain.vue";

const router = useRouter();

import ArticleCard from "components/card/ArticleCard.vue";
import TopBarMain from "components/common/TopBarMain.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    'article-card': ArticleCard,
    'top-bar-main': topBarMain
  },
  data() {
    return {
      homeArticleTab: "All",
      articleList: [
        {
          id: "articleId",
          title: "중장년 취업 고민 #1: 경력 미달",
          articleType: "스토리",
          writer: "원준",
          badgeTitle: "취업_전문가",
          createdAt: "1시간전",
          description: "젊은 지원자들과 어떻게 경쟁할 수 있을까요?",
          writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
          articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
          motivation: "999",
          viewCount: "999",
        },
        {
          title: "중장년 취업 고민 #2: 기술 업데이트",
          articleType: "스토리",
          writer: "원준",
          badgeTitle: "취업_전문가",
          createdAt: "1시간전",
          description: "제 두 번째 고민은 기술 업데이트입니다.",
          writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
          articleThumb: "https://plus.unsplash.com/premium_photo-1663840297123-29164230cc9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5070&q=80",
          motivation: "999",
          viewCount: "999",
        },
        {
          title: "중장년 취업 고민 #2: 기술 업데이트",
          articleType: "스토리",
          writer: "원준",
          badgeTitle: "취업_전문가",
          createdAt: "1시간전",
          description: "제 두 번째 고민은 기술 업데이트입니다.",
          writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
          articleThumb: "https://images.unsplash.com/photo-1682685797741-f0213d24418c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5070&q=80",
          motivation: "999",
          viewCount: "999",
        },
        {
          title: "중장년 취업 고민 #1: 경력 미달",
          articleType: "스토리",
          writer: "원준",
          badgeTitle: "취업_전문가",
          createdAt: "1시간전",
          description: "저의 고민은 경력 부족입니다.",
          writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
          articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
          motivation: "999",
          viewCount: "999",
        },
      ]
    }
  },
  created() {
    this.checkOnboard();
    this.checkLogin();
  },
  methods: {
    checkOnboard() {
      if (this.userId) {
        return
      } else {
        this.$router.push('/login');
      }
    },
    checkLogin() {
      if (this.onboardShow) {
        // this.$router.push('/onboard');
      } else {
        return;
      }
    },
    setTabUI(tab) {
      console.log('tab')
      this.homeArticleTab = tab;
    },
    linkToServiceComment() {
      this.$router.push('/service-comment/step1');
    },
  },
  computed: {
    userId() {
      return localStorage.getItem('user_id');
    },
    onboardShow() {
      return localStorage.getItem('onboard_show')
    }
  }
})
</script>

<style scoped>
.home {
  padding: 20px;
  background: linear-gradient(180deg, #FFF 14.1%, #F4F4F4 73.82%);
}

.tab {
  display: flex;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 8px;
}

.tab-item {
  font-size: 1.31rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;

  padding: 6px;
  padding-bottom: 2px;
  border-bottom: 2px solid #fff;
  transition: all 0.5s;
}

.tab-focus {
  color: #FD384E;
  border-bottom: 2px solid #FD384E;
}

.event-card {
  background: #FD384E;
  height: 96px;
  border-radius: 12px;
}

.btn-learn-more {
  display: flex;
  width: 100%;
  height: 63px;
  padding: 20px 0px;
  justify-content: center;
  align-items: center;
  color: #FD7F38;
  background-color: #fff;
  border: none;
}

.feed-back-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 30px;
  background-color: #fff;
}

.feed-back-section p {
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;

  margin-block-start: 15px;
  margin-block-end: 15px;
}

.feed-back-section .sun-animation {
  width: 56px;
  height: 56px;
}

.btn-main {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 100px;
  background-color: #FD384E;
  color: #fff;
  padding: 10px 24px;
  border: none;
  font-size: 0.875px;
}
</style>
