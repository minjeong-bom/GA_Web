<script>
import TopBarSub from "components/common/TopBarSub.vue";

export default {
  name: "MYP3100",
  components: {TopBarSub},
  data() {
    return {
      askId: '',
    }
  },
  mounted() {
    const askId = this.$route.query.askid;
    this.askId = askId;
  }
}
</script>

<template>
<div>
  <top-bar-sub :back="true"></top-bar-sub>
  <div class="ask-article">
    <h1>
      보안 관련 질문 {{ this.askId }}
    </h1>
    <p>2023.08.01 문의</p>
    <p>
      커뮤니티 웹사이트에 로그인할 때 자동 로그인 기능을 사용하는 것이 안전한가요?
    </p>
  </div>
  <div>
    {{  }}
  </div>
</div>
</template>

<style scoped>
.ask-article h1 {

}
</style>
