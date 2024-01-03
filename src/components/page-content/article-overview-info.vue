<script>
export default {
  name: "article-overview-info",
  props: {
    likesLength: String,
    commentLength: String,
  }
}
</script>

<template>
  <div class="frame">
    <span class="lable">공감</span>
    <span class="value">{{ likesLength }}</span>
    <span>∙</span>
    <span class="lable">댓글</span>
    <span class="value">{{ commentLength }}</span>
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  align-items: center;
  gap: 3px;
}

.value {
  color: var(--ga-red);
  font-family: Spoqa Han Sans Neo, "sans-serif";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
}

.lable {
  color: #999;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
}
</style>
