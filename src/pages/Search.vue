<template>
  <div class="search-page">
    <top-bar :title="'검색'"></top-bar>
    <div>
      <q-input v-model="search" :bg-color="'white'" :input-style="{ fontSize: '16px' }">
        <template v-slot:prepend>
          <i class="fa-solid fa-magnifying-glass" style="padding-left: 24px"></i>
        </template>
      </q-input>
    </div>
    <section>
      <h2>많이 찾고 있는 키워드</h2>
      <div class="tag-list">
        <span v-for="item in keywords" @click="search = item">{{ item }}</span>
      </div>
    </section>
    <section>
      <h2>많이 찾고 있는 키워드</h2>
      <div>
        <div class="tab">
          <div class="tab-item" :class="{ 'tab-focus' : categoryTab === 'Story' }" @click="setTabUI('Story')">스토리</div>
          <div class="tab-item" :class="{ 'tab-focus' : categoryTab === 'Skill' }" @click="setTabUI('Skill')">취업스킬</div>
          <div class="tab-item" :class="{ 'tab-focus' : categoryTab === 'Pick' }" @click="setTabUI('Pick')">지애 픽</div>
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
      </div>
    </section>
  </div>
</template>

<script>
import TopBarSub from "components/app-bar/TopBarSub.vue";
import ArticleCard from "components/card/ArticleCard.vue";

export default {
  components: {
    'top-bar': TopBarSub,
    'article-card': ArticleCard,
  },
  data() {
    return {
      categoryTab: "Story",
      search: "",
      keywords: [
        '재취업',
        '이직',
        '고민',
        '이력서 작성',
        '은퇴 준비',
        '명퇴',
        '일거리',
        '보람',
      ],
      articleList: [
        {
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
        },
        {
          title: "중장년 취업 고민 #2: 기술 업데이트",
          articleType: "스토리",
          writer: "원준",
          badgeTitle: "취업_전문가",
          createdAt: "1시간전",
          description: "제 두 번째 고민은 기술 업데이트입니다. 빠르게 변화하는 시장에서 어떻게 뒤떨어지지 않고 기술을 습득할 수 있을까요?",
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
          description: "제 두 번째 고민은 기술 업데이트입니다. 빠르게 변화하는 시장에서 어떻게 뒤떨어지지 않고 기술을 습득할 수 있을까요?",
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
          description: "저의 고민은 경력 부족입니다. 젊은 지원자들과 어떻게 경쟁할 수 있을까요?",
          writerThumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80",
          articleThumb: "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4016&q=80",
          motivation: "999",
          viewCount: "999",
        },
      ]
    }
  },
  methods: {
    setTabUI(tab) {
      console.log('tab')
      this.categoryTab = tab;
    },
  }
}
</script>

<style scoped>
.search-page {
  background: #FCFCFC;
}

h2 {
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-block-start: 0;
  margin-block-end: 0;
}

.tag-list {
  padding: 0 5px;
}

.tag-list span {
  display: inline-block;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 12px;

  font-size: 16px;
  font-weight: 500;

  border: 1px solid #EFB8C8;
  border-radius: 20px;
}

section {
  background: #fff;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 10px;
}

.tab {
  display: flex;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 8px;
}

.tab-item {
  font-size: 21px;
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
</style>
