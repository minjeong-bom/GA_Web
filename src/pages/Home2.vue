<template>
  <q-page class="home-desktop">
    <!-- 인기글 -->
    <div>
      <section class="a-1-section">
        <h2 class="headline-2">인기글</h2>
        <div class="hot-article-card">
          <p class="lable-2">가나다라마바사아자차카타파하가나다라마바사 최대 40자...</p>
          <div>
            <span class="small-black-label">카테고리명</span>
            <span class="caption-1">2023.10.01</span>
          </div>
        </div>
        <div class="hot-article-card">
          <p class="lable-2">가나다라마바사아자차카타파하가나다라마바사 최대 40자...</p>
          <div>
            <span class="small-black-label">카테고리명</span>
            <span class="caption-1">2023.10.01</span>
          </div>
        </div>
        <div class="hot-article-card">
          <p class="lable-2">가나다라마바사아자차카타파하가나다라마바사 최대 40자...</p>
          <div>
            <span class="small-black-label">카테고리명</span>
            <span class="caption-1">2023.10.01</span>
          </div>
        </div>
        <div class="hot-article-card">
          <p class="lable-2">가나다라마바사아자차카타파하가나다라마바사 최대 40자...</p>
          <div>
            <span class="small-black-label">카테고리명</span>
            <span class="caption-1">2023.10.01</span>
          </div>
        </div>
        <div class="hot-article-card">
          <p class="lable-2">가나다라마바사아자차카타파하가나다라마바사 최대 40자...</p>
          <div>
            <span class="small-black-label">카테고리명</span>
            <span class="caption-1">2023.10.01</span>
          </div>
        </div>
      </section>
    </div>
    <!-- 이벤트 베너 -->
    <div class="layout-center l-column">
      <notice-card bg-color="#FD384E" class="notice-card-area"></notice-card>
      <!-- 본문 글 -->
      <section class="article-list-section">
        <tab :tabs="tabList" default-tab="all" margin-bottom="10px" padding-top="0" @changeTab="changeTab"></tab>
        <p>본문글</p>
      </section>
    </div>
    <!-- 회원 정보 -->
    <div>
      <section>
        <p>회원정보</p>
      </section>
      <!-- 푸터 -->
      <div>
        <p>푸터</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import eventCard from "components/card/EventCard.vue";
import noticeCard from "components/card/NoticeCard.vue";
import Tab from "components/tab/Tab.vue";

export default {
  components: {
    Tab,
    eventCard,
    noticeCard,
  },
  data() {
    return {
      tabList: [
        {
          id: 'all',
          title: '전체'
        },
        {
          id: 'story',
          title: '스토리',
        },
        {
          id: 'skills',
          title: '취업스킬',
        },
        {
          id: 'pick',
          title: `지애's Pick`
        }
      ]
    }
  },
  methods: {
    changeTab(tabId) {
      console.log(tabId)
    },
  }
}
</script>

<style lang="scss" scoped>
.home-desktop {
  background-color: var(--k-5);
  width: 1280px;

  display: grid;
  grid-template-columns: 245px 1fr 245px;
  grid-gap: 30px;
  padding: 30px;

  .layout-center {
    gap: 30px;

    .article-list-section {
      height: 100%;
    }

    .notice-card-area {
      height: fit-content;
      border: 1px solid red;
    }
  }

  section {
    background: #fff;
    padding: 1.25rem;
    border-radius: 0.75rem;
    box-sizing: border-box;
  }

  .a-1-section {
    width: 245px;
  }

  .hot-article-card {
    width: 213px;
    padding: 10px 0;
    border-bottom: 1px solid #E6E6E6;

    .caption-1 {
      color: var(--k-40);
    }
  }

}

</style>
