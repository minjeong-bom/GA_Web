<script>
import timeAgo from '/src/script/timeData/timeAgo'
import IconAlart from "components/modal/iconAlart.vue";
import {useQuasar} from "quasar";
import ConfilrmDialog from "components/modal/confilrmDialog.vue";
export default {
  name: "ArticleId",
  components: {ConfilrmDialog, IconAlart},
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
  },
  data() {
    return {
      deleteModal: false,
    }
  },
  methods: {
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
      console.log(this.createrKey, this.userKey);
      return this.createrKey === this.userKey;
    }
  }
}
</script>

<template>
  <div class="card-id-wrap">
    <!-- User Profile Image -->
    <div
	    class="profile-wrap"
	    :style="`background-image: url(${this.userProfile});`"
    ></div>
    <!-- Creater & Created Time -->
    <div class="l-column" style="width: 100%">
      <!-- 00님이 000을 올렸어요 (하위메뉴) -->
      <div class="created-user-and-lable">
        <div class="created-user-info-wrap card-headline-1">
          <span>{{ createrName ? createrName : "비공개 회원" }}님이</span>
          <span>
            <span class="high-light">{{ articleType }}</span>
            {{ articleType === '스토리'? '를' : '을' }} 올렸어요
          </span>
          <div v-if="articleType" class="cartegory2-lable">
            <span>{{ articleType }}</span>
          </div>
        </div>
      </div>
      <!-- Badge + User Role Caption | Created Time -->
      <div class="user-badge-created-time-wrap">
        <img class="user-badge" src="../../assets/icon/person_assignment_24px.svg"/>
        <span class="card-caption-1">{{ jobTitle }}</span>
        <span class="card-caption-2" v-show="createdAtTimeShow">|</span>
        <span class="card-caption-1" v-show="createdAtTimeShow">{{ createdAtTimeShow }}</span>
      </div>
    </div>
    <!-- More Button -->
    <q-btn flat round icon="more_vert" v-if="controlUi" >
      <q-menu v-if="isMyPost">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="editArticle()">
            <q-item-section>수정하기</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="deleteModal = true">
            <q-item-section>삭제하기</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <q-menu v-if="isMyPost">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="reportArticle">
            <q-item-section>신고하기</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <confilrm-dialog
      :alert-show="deleteModal"
      :description="'정말 삭제하시겠습니까?'"
      :confirm-button-text="'삭제'"
      @cancel="deleteModal = false"
      @confirm="deleteArticle"
    ></confilrm-dialog>
  </div>
</template>

<style scoped>
.profile-wrap {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
	background-color: var(--grays-gray-2);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 30px;
}

.created-user-and-lable {
  gap: 0.625rem;
}

.created-user-info-wrap>span {
  margin-right: 0.1875rem;
}

.user-badge-created-time-wrap {
  display: inline-flex;
  padding: 0.125rem 0rem;
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

</style>
