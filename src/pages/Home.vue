<template>
  <q-page class="home">
    <section>
      <!-- Event Cards -->
      <event-card></event-card>
      <!-- Notice Cards -->
      <notice-card></notice-card>
      <!-- Article Cards -->
      <div>
        <!-- Article Card -->
        <tab :tabs="tabList" @changeTab="changeTab"></tab>
        <div v-for="item in articleList">
          <article-card
            :article-key="item.bc_key"
            :title="item.bc_title"
            :article-thumb="item.articleThumb"
            :article-type="item.category_name"
            :article-type2="item.category_name"
            :writer="item.bc_writer_name"
            :badge-title="item.badgeTitle"
            :created-at="item.bc_regdate"
            :writer-thumb="item.writerThumb"
            :motivation="item.motivation"
            :view-count="item.bc_count"
            :creater-key="item.bc_writer_key"
          >
          </article-card>
        </div>
      </div>
    </section>

    <!-- 아티클 더보기 -->
    <button class="btn-learn-more" @click="addLoadArticle">더 보기</button>
    <!-- 피드백 -->
    <section class="feed-back-section">
      <img class="sun-animation" src="../assets/graphic/sun-animation.gif">
      <p>G@에 알려주고 싶은 이야기가 있나요?</p>
      <button class="btn-primary-small">네, 있어요</button>
    </section>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter();
import ArticleCard from "components/card/ArticleCard.vue";
import Tab from "components/tab/Tab.vue";
import EventCard from "components/card/EventCard.vue";
import NoticeCard from "components/card/NoticeCard.vue";
import BottomAppBar from "components/app-bar/BottomAppBar.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    BottomAppBar,
    'article-card': ArticleCard,
    'tab': Tab,
    'event-card': EventCard,
    'notice-card': NoticeCard,
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
	    tabCategoryType: '',
      articleList: [],
	    articleListLength: 5,
    }
  },
  created() {
    this.checkOnboard();
    this.changeTab(1);
  },
  mounted() {
    this.getArticleList('all', this.articleListLength);
  },
  methods: {
	  addLoadArticle() {
			this.articleListLength = this.articleListLength + 10;
			this.getArticleList(this.tabCategoryType, this.articleListLength)
	  },
    checkOnboard() {
      if (this.onboard) {
        this.checkLogin();
      } else {
        this.$router.push('/onb0000');
      }
    },
    checkLogin() {
      if (this.userId) {
        return
      } else {
	      this.$router.push('/login');
      }
    },
    changeTab(tabId) {
	    this.articleList = [];
	    this.articleListLength = 5;

	    if (tabId === 1) {
				this.getArticleList('');
				this.tabCategoryType = '';
      } else if (tabId === 2) {
	      this.getArticleList('story');
		    this.tabCategoryType = 'story';
      } else if (tabId === 3) {
	      this.getArticleList('skills');
		    this.tabCategoryType = 'skills';
      } else {
	      this.getArticleList('gapick');
				this.tabCategoryType = 'gapick'
      }
    },
    async getArticleList(category, limit) {
      const commonConfig = {
        url: '/api/crud/lists/',
        data: {
          "alias": "bc",
          "prefix": "bc",
          "scopes": "bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key",
          "columns_opts": {
            "bc_foreign_key2": "SNXKQEZS"
          },
          "limit": limit
        },
        etc: {
          headers : {
            'SPRINT-API-KEY' : 'sprinttest',
          }
        }
      };
      let config = { ...commonConfig };

      // 카테고리 별 'bc_foreign_key' 설정
      if (category === 'story') {
        config.data.columns_opts.bc_foreign_key = "DPORHCPV"; // 스토리
      } else if (category === 'skills') {
        config.data.columns_opts.bc_foreign_key = "KWUOXKGM"; // 스킬
      } else if (category === 'gapick') {
        config.data.columns_opts.bc_foreign_key = "CEZTXGLJ"; // 스킬
      }

      // API 호출
	    const res = await this.$api.post(config.url, config.data, config.etc);
      let response = res.data.response.lists;

      // 카테고리 이름 삽입
      const categoryInfo = {
        DPORHCPV: "스토리",
        KWUOXKGM: "취업 스킬",
        CEZTXGLJ: "지애픽"
      };
      response.forEach(item => {
        item.category_name = categoryInfo[item.bc_foreign_key] || null;
      });

      // 작성자명 가공 함수 호출
      this.replaceWriterNames(response);
    },
    async replaceWriterNames(array) {
      for (let item of array) {
				try {
					const res = await this.$api.post(
						`/api/crud/single/${item.bc_writer_name}`,
						{
							prefix: "mem",
							alias: "mem",
							scopes: "mem_title,mem_job"
						},
						{
							headers: {
								'SPRINT-API-KEY' : 'sprinttest',
							}
						}
					)
					if (res.data.status === 'success') {
						item.bc_writer_key = item.bc_writer_name;
						item.bc_writer_name = res.data.response.view.mem_title;
						if (res.data.response.view.mem_job) {
							item.badgeTitle = res.data.response.view.mem_job
						} else {
							item.badgeTitle = "일반 회원" // job 정보가 등록되지 않은 회원은 일반 회원으로 표시
						}
					}
				} catch (e) {
					item.badgeTitle = "비공개 회원" // 삭제된 회원
				}
      }
      this.articleList = array;
    }
  },
  computed: {
    userId() {
      return localStorage.getItem('userId');
    },
    onboard() {
      return localStorage.getItem('isOnboard');
    }
  }
})
</script>

<style scoped>
.home {
  //padding: 20px;
  background: linear-gradient(180deg, #FFF 14.1%, #F4F4F4 73.82%);
}

.home section {
  padding: 20px;
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
