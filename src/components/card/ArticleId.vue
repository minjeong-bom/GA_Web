<script>
import timeAgo from '/src/script/timeData/timeAgo'
import IconAlart from "components/modal/iconAlart.vue";
import ConfilrmDialog from "components/modal/confilrmDialog.vue";
import UserProfileThumb from "components/profile/userProfileTumb.vue";

export default {
  name: "ArticleId",
  components: {
    UserProfileThumb,
    ConfilrmDialog,
    IconAlart
  },
  props: {
    articleKey: String,
    articleType: String,
    viewCount: String,
    createrName: String,
    jobTitle: String,
    createdAt: String,
    controlUi: {
      type: Boolean,
      default: true,
    },
    userProfile: String,
    createrKey: String, // 작성자의 키값
    userKey: String, // 사용자의 키값
    userMode: String,
  },
  data() {
    return {
      deleteModal: false,
      bookmarks: [],
      isMarked: false,
    }
  },
  methods: {
    async checkBookmarkedPage() {
      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_title,bc_content',
          columns_opts: {
            bc_foreign_key2: 'SWMUCCYD',
            bc_foreign_key: 'LBUSDDGP',
          },
          limit: 100
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }
      const result = await this.$api.post(config.url, config.body, config.etc);
      const res = result.data.response.lists;

      if (res) {
        const isMarked = res.some(item => item.bc_content === this.articleKey);
        this.isMarked = isMarked;
      }

      if (this.isMarked) {
        const marked = res.find(item => item.bc_content === this.articleKey);
        this.bookmarkKey = marked.bc_key;
        console.log(this.bookmarkKey)
      }
    },
    async addBookmark() {
      try {
        await this.checkBookmarkedPage();
        if (this.bookmarked) {
          this.$q.notify('이미 북마크에 추가된 게시글입니다.')
          return
        }
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'bc',
            data_title: this.userKey,
            data_foreign_key2: 'SWMUCCYD', // 게시판 키
            data_foreign_key: 'LBUSDDGP', // 카테고리 키
            data_content: this.articleKey,
            data_writer_name: this.userKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          }
        }
        this.$api.post(config.url, config.body, config.etc);
        this.$q.notify('북마크에 추가되었습니다');
        this.isMarked = true;
      } catch (e) {
        this.$q.notify('북마크에 추가할 수 없습니다');
      }
    },
    share() {
      const currentURL = 'www.goodafternoon.life/#/article?key=' + this.articleKey;

      const inputElement = document.createElement('input');
      inputElement.value = currentURL;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);

      this.$q.notify('클립보드에 복사되었습니다');
    },
    editArticle() {
      console.log(this.articleKey, 'Edit');

    },
    deleteArticle() {
      this.deleteModal = false;
      console.log(this.articleKey, 'Delete');
    },
    reportArticle() {
      // 신고하기 기능 추가
    }
  },
  computed: {
    createdAtTimeShow() {
      if (this.createdAt) {
        return timeAgo.timeAgo(this.createdAt);
      } else {
        return false;
      }
    },
    isMyPost() {
      return this.createrKey === this.userKey;
    }
  }
}
</script>

<template>
  <div class="card-id-wrap">
    <!-- User Profile Image -->
    <user-profile-thumb :user-key="createrKey" size="48px"/>
    <!-- Creater & Created Time -->
    <div class="l-column" style="width: 100%">
      <!-- 00님이 000을 올렸어요 (하위메뉴) -->
      <div class="created-user-and-lable">
        <div class="created-user-info-wrap card-headline-1">
          <span>{{ createrName ? createrName : "비공개 회원" }}님이</span>
          <span>
            <span class="high-light">{{ articleType }}</span>
            {{ articleType === '스토리' ? '를' : '을' }} 올렸어요
          </span>
          <div v-if="articleType" class="cartegory2-lable">
            <span>{{ articleType }}</span>
          </div>
        </div>
      </div>
      <!-- Badge + User Role Caption | Created Time -->
      <div class="user-badge-created-time-wrap">
        <img v-if="userMode === 'pro'" :alt="`${userMode} 전용 뱃지`" class="user-badge"
             src="../../assets/icon/person_assignment_24px.svg"/>
        <img v-else-if="userMode === 'enterprise'" :alt="`${userMode} 전용 뱃지`" class="user-badge"
             src="../../assets/icon/person_assignment_24px.svg"/>
        <span class="card-caption-1">{{ jobTitle }}</span>
        <span v-show="createdAtTimeShow" class="card-caption-2">|</span>
        <span v-show="createdAtTimeShow" class="card-caption-1">{{ createdAtTimeShow }}</span>
      </div>
    </div>
    <!-- More Button -->
    <q-btn v-if="controlUi" flat icon="more_vert" round>
      <q-menu v-if="isMyPost">
        <q-list style="min-width: 100px">
          <q-item v-close-popup clickable @click="share()">
            <div class="item-section">공유</div>
          </q-item>
          <q-item v-close-popup clickable @click="editArticle()">
            <div class="item-section">수정</div>
          </q-item>
          <q-item v-close-popup clickable @click="deleteModal = true">
            <div class="item-section">삭제</div>
          </q-item>
        </q-list>
      </q-menu>
      <q-menu v-else>
        <q-list style="min-width: 100px">
          <q-item v-close-popup clickable @click="share()">
            <div class="item-section">공유</div>
          </q-item>
          <q-item v-close-popup clickable @click="addBookmark()">
            <div class="item-section">북마크</div>
          </q-item>
          <q-item v-close-popup clickable @click="reportArticle">
            <q-item-section>신고하기</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <confilrm-dialog
      :alert-show="deleteModal"
      :confirm-button-text="'삭제'"
      :description="'정말 삭제하시겠습니까?'"
      @cancel="deleteModal = false"
      @confirm="deleteArticle"
    ></confilrm-dialog>
  </div>
</template>

<style scoped>
.created-user-and-lable {
  gap: 0.625rem;
}

.created-user-info-wrap > span {
  margin-right: 0.1875rem;
}

.user-badge-created-time-wrap {
  display: inline-flex;
  padding: 0.125rem 0;
  align-items: center;
  gap: 0.1875rem;
}

.card-id-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1875rem;
  margin-bottom: 0.5rem;
}

.cartegory2-lable {
  display: inline-block;
  padding: 0.0625rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.25rem;
  border: 0.33px solid var(--fills-quartternary);
  background: var(--grays-gray-7);
}

.item-section {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  font-size: 1rem;
}
</style>
