<script>
export default {
  name: "article-overview-info",
  props: {
    likesLength: {
      type: Array,
      default: [],
    },
    commentLength: {
      type: Array,
      default: [],
    },
  }
}
</script>

<template>
  <div class="article-overview">
    <span class="lable">공감</span>
    <span class="value">{{ likesLength.length }}</span>
    <span> ∙ </span>
    <span class="lable">댓글</span>
    <span class="value">{{ commentLength.length }}</span>
  </div>
</template>

<style scoped>
.article-overview {
  display: flex;
  align-items: center;
  padding: 11px 16px;
  gap: 3px;
}

.article-overview .value {
  color: var(--ga-red);
  font-family: Spoqa Han Sans Neo, "sans-serif";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
}

.article-overview .lable {
  color: #999;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
}
</style>
