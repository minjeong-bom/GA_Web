<script>
export default {
  name: "ArticleId",
  props: {
    articleType: String,
    articleType2: String,
    viewCount: String,
    writer: String,
    jobTitle: String,
    createdAt: String,
  },
  computed: {
    timeAgo() {
      const dateString = this.createdAt;

      const now = new Date();
      const past = new Date(dateString);
      const diff = now - past;

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        return `${seconds}초 전`;
      } else if (minutes < 60) {
        return `${minutes}분 전`;
      } else if (hours < 24) {
        return `${hours}시간 전`;
      } else {
        return `${days}일 전`;
      }
    }
  }
}
</script>

<template>
  <div class="card-id-wrap">
    <!-- User Profile Image -->
    <div class="profile-wrap"></div>
    <!-- Creater & Created Time -->
    <div class="l-column" style="width: 100%">
      <!-- 00님이 000을 올렸어요 (하위메뉴) -->
      <div class="created-user-and-lable">
        <div class="created-user-info-wrap card-headline-1">
          <span>{{ writer? writer : "익명" }}님이</span><span><span class="high-light">{{ articleType }}</span>{{ articleType === '스토리'? '를' : '을' }} 올렸어요</span>
          <div class="cartegory2-lable">
            <span>{{ articleType2 }}</span>
          </div>
        </div>
      </div>
      <!-- Badge + User Role Caption | Created Time -->
      <div class="user-badge-created-time-wrap">
        <img class="user-badge" src="../../assets/icon/person_assignment_24px.svg"/>
        <span class="card-caption-1">{{ jobTitle }}</span>
        <span class="card-caption-2">|</span>
        <span class="card-caption-1">{{ timeAgo }}</span>
      </div>
    </div>
    <!-- More Button -->
    <q-btn flat round icon="more_vert" />
  </div>
</template>

<style scoped>
.profile-wrap {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  background-image: url("../../assets/graphic/user-profile-thumb-sample.jpeg");
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

.cartegory2-lable span {
  color: var(--grays-gray-2);
  font-size: 0.75rem;
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
