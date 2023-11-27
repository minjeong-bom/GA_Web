<template>
  <div>
    <div class="card">
      <!-- 카드 아이디 영역 -->
      <div class="card-id-wrap">
        <div class="profile-wrap"></div>
        <div class="l-column">
          <div class="created-user-and-lable">
            <div class="created-user-info-wrap ">
              <span class="card-headline">원준님이</span>
              <span>추천글</span>
              <span>을 올렸어요</span>
            </div>
            <div class="cartegory2-lable">
              <span>하위메뉴</span>
            </div>
          </div>

        </div>
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
.card-id-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.1875rem;
}

.profile-wrap {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
}
.created-user-and-lable {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
}

.created-user-info-wrap {
  display: flex;
  align-items: center;
  gap: 0.1875rem;
}

.cartegory2-lable {
  display: flex;
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
}
</style>
