<template>
  <q-page class="home">
    <!-- 이벤트 베너 -->
    <section class="event-card-list">
      <div class="event-card">
      </div>
    </section>

    <!-- 아티클 카드 -->
    <section>
      <!-- 탭 -->
      <tab :tabs="tabList" @changeTab="changeTab"></tab>
      <!-- 테스트 -->
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
      <button class="btn-primary-small" @click="linkToServiceComment()">네, 있어요</button>
    </section>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter();

import ArticleCard from "components/card/ArticleCard.vue";
import Tab from "components/tab/Tab.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    'article-card': ArticleCard,
    'tab': Tab,
  },
  data() {
    return {
      tabList: [
        {
          id: 1,
          title: '전체'
        },
        {
          id: 2,
          title: '스토리'
        },
        {
          id: 3,
          title: '취업스킬'
        },
        {
          id: 4,
          title: '지애픽'
        },
      ],
      tabFocused: 0,
      articleList: [],
    }
  },
  created() {
    this.checkOnboard();
    this.checkLogin();
    this.changeTab(1);
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
    changeTab(tabId) {
      this.activeTab = tabId;
      console.log('home.vue', this.activeTab);
      if (this.activeTab === 1) {
        this.articleList = [
          {
            id: "articleId",
            title: "일과 취미의 균형 유지",
            description: "균형 삶, 일과 취미",
            articleType: "스토리",
            writer: "민정",
            badgeTitle: "취업_전문가",
            createdAt: "1시간전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
            motivation: "999",
            viewCount: "999",
          },
          {
            id: "articleId",
            title: "취미와 일의 조화 찾기",
            description: "조화로운 삶, 일과 취미",
            articleType: "지애픽",
            writer: "민정",
            badgeTitle: "취업_전문가",
            createdAt: "1시간전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
            motivation: "999",
            viewCount: "999",
          },
          {
            id: "articleId",
            title: "취미와 일의 조합 미숙점",
            description: "미숙점, 취미와 일",
            articleType: "취업스킬",
            writer: "민정",
            badgeTitle: "취업_전문가",
            createdAt: "1시간전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
            motivation: "999",
            viewCount: "999",
          },
        ]
      } else if (this.activeTab === 2) {
        this.articleList = [
          {
            id: "articleId",
            title: "일과 취미의 균형 유지",
            description: "균형 삶, 일과 취미",
            articleType: "스토리",
            writer: "민정",
            badgeTitle: "취업_전문가",
            createdAt: "1시간전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
            motivation: "999",
            viewCount: "999",
          },
        ]
      } else if (this.activeTab === 3) {
        this.articleList = [
          {
            id: "articleId",
            title: "Notion 잘 활용하는 방법",
            description: "아직도 못 쓰는 사람이 있나요?",
            articleType: "취업스킬",
            writer: "민정",
            badgeTitle: "취업_전문가",
            createdAt: "3일전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
            motivation: "999",
            viewCount: "999",
          },
        ]
      } else if (this.activeTab === 4) {
        this.articleList = [
          {
            id: "articleId",
            title: "2024년 부터 변경되는 중장년 지원 정책 5",
            description: "내년 부터는 취업하기 더 어려워질 수 있어요. 내년 부터는 취업하기 더 어려워질 수 있어요.",
            articleType: "지애픽",
            writer: "지애",
            badgeTitle: "취업_전문가",
            createdAt: "1시간전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "",
            motivation: "999",
            viewCount: "999",
          },
          {
            id: "articleId",
            title: "2024년 부터 변경되는 중장년 지원 정책 5",
            description: "내년 부터는 취업하기 더 어려워질 수 있어요. 내년 부터는 취업하기 더 어려워질 수 있어요.",
            articleType: "지애픽",
            writer: "지애",
            badgeTitle: "취업_전문가",
            createdAt: "1시간전",
            writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
            articleThumb: "",
            motivation: "999",
            viewCount: "999",
          },
        ]
      }
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
</style>
