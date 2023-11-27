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
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";
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
      articleList: [
        {
          title: 'Mockup Text',
          articleThumb: '',
          articleType: '추천글',
          writer: '관리자',
          badgeTitle: 'OO전문가',
          createdAt: '1시간 전',
          description: '하위분류',
        }
      ],
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
      if (tabId === 1) {

      } else if (tabId === 2) {

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
