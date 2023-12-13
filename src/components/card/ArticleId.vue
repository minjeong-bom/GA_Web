<script>
import timeAgo from '/src/timeData/timeAgo'
import article from "../../pages/Article.vue";
export default {
  name: "ArticleId",
	props: {
    articleType: String,
    viewCount: String,
	  createrName: String,
    jobTitle: String,
    createdAt: {
			type: String,
	    default: ''
    },
	  controlUi: {
			type: Boolean,
		  default: true,
	  },
	  userProfile: {
			type: String,
		  default: '',
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
          <span>{{ createrName ? createrName : "비공개 회원" }}님이</span><span><span class="high-light">{{ articleType }}</span>{{ articleType === '스토리'? '를' : '을' }} 올렸어요</span>
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
    <q-btn flat round icon="more_vert" v-if="controlUi" />
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
