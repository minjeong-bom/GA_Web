<template>
  <div>
    <div class="card">
      <!-- Card Id -->
      <div class="card-id-wrap">
        <!-- User Profile Image -->
        <div class="profile-wrap"></div>
        <!-- Creater & Created Time -->
        <div class="l-column" style="width: 100%">
          <!-- 00님이 000을 올렸어요 (하위메뉴) -->
          <div class="created-user-and-lable">
            <div class="created-user-info-wrap card-headline-1">
              <span>원준님이</span><span><span class="high-light">추천글</span>을 올렸어요</span>
              <div class="cartegory2-lable">
                <span>하위메뉴</span>
              </div>
            </div>
          </div>
          <!-- Badge + User Role Caption | Created Time -->
          <div class="user-badge-created-time-wrap">
            <img class="user-badge" src="../../assets/icon/person_assignment_24px.svg"/>
            <span class="card-caption-1">OO 전문가</span>
            <span class="card-caption-2">|</span>
            <span class="card-caption-1">3분전 작성</span>
          </div>
        </div>
        <!-- More Button -->
        <q-btn flat round icon="more_vert" />
      </div>
      <!-- Thumbnail & Title -->
      <div class="article-card-thumbnail">
        <div class="article-card-headline-wrap">
          <h4 class="article-card-headline">가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사최대 40자</h4>
        </div>
      </div>
      <!-- Likes & Comment -->
      <div class="like-read-wrap">
        <section>
          <q-icon name="sentiment_satisfied_alt" size="18px"></q-icon>
          <span>999</span>
        </section>
        <section>
          <span>조회</span>
          <span>999</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    articleType: String,
    writer: String,
    badgeTitle: String,
    createdAt: String,
    description: String,
    writerThumb: String,
    articleThumb: String,
    motivation: String,
    viewCount: String,
  },
  methods: {
    linkToArticle() {
      this.$router.push('article');
      // $route.query.name
    },
  }
}
</script>

<style scoped>
.card {
  padding-bottom: 0.38rem;
}

.card-id-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1875rem;
  margin-bottom: 0.5rem;
}

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

.article-card-thumbnail {
  position: relative;
  width: 100%;
  height: 12.25rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
}

.article-card-thumbnail img {
  width: 100%;
}

.article-card-thumbnail {

}

.linear-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 115.35%);
}

.article-card-headline-wrap {
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.625rem;
}

.like-read-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.2rem;
  padding-left: 0.3rem;
}

.like-read-wrap section {
  display: flex;
  height: 1.5rem;
  align-items: center;
  gap: 0.0625rem;
}

.like-read-wrap section * {
  color: #999999;
}

</style>
