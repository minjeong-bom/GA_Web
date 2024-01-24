<script>
export default {
  name: "AskCard",
  props: {
    title: String,
    created: String,
    status: String,
  }
}
</script>

<template>
  <div>
    <div class="ask-item">
      <div class="ask-wrapper">
        <h3 class="ask-title">{{ this.title }}</h3>
        <p class="ask-date">{{ this.created }}</p>
      </div>
      <div class="ask-status">
        {{ this.status }}
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-block-end: 0;
}

.ask-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-bottom: 1px solid #E6E0E9;
}

.ask-date {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #938F96;
}

.ask-wrapper {
  display: flex;
  width: 270px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  padding: 20px 0;
}

.ask-item h3 {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-block-start: 0;
  margin-block-end: 0;
}

.ask-status {
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #938F96;
}
</style>
