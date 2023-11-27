<template>
  <div>
    <topbar :back="false" :title="'가입 완료'"></topbar>
    <section>
      <h1>
        {{ userId }}님 <br>
        반가워요!
      </h1>
      <p>
        {{ userId }}님을 좀 더 알고 싶어요.<br>
        다른 사람과 소통하고,<br>
        더 알맞는 정보를 추천하는데<br>
        도움이 될 거에요.
      </p>
    </section>
    <button class="btn-bottom-one">다음</button>
  </div>
</template>

<script>
import TopBarSub from "components/app-bar/TopBarSub.vue";
export default {
  components: {
    'topbar': TopBarSub,
  },
  data() {
    return {
      check: {
        service: false,
        userinfo: false,
      }
    }
  },
  methods: {
    check(item) {
      if (item === 'all') {
        this.check.service = true;
        this.check.userinfo = true;
      } else {
        if (item === 'service') {
          this.check.service = !this.check.service;
        };
        if (item === 'userinfo') {
          this.check.userinfo = !this.check.userinfo;
        };
      };
    },
  },
  computed: {
    userId() {
      return localStorage.getItem('user_id');
    }
  }
}
</script>

<style scoped>
section {
  padding: 0 20px;
}

h1 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
}
</style>
