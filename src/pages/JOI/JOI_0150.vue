<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "JOI_0150",
  components: {TitleTopBar},
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      userId: '회원',
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    async getUserInfo() {
      const storageUserKey = localStorage.getItem('userKey');
      try {
        const config = {
          url: `/api/crud/single/${storageUserKey}`,
          body: {
            prefix: 'mem',
            alias: 'mem',
            scopes: 'mem_key,mem_status,mem_id,mem_title'
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        const userInfo = res.data.response.view;
        this.userId = userInfo.mem_id;
        localStorage.setItem('userId', userInfo.mem_id);
        localStorage.setItem('userName', userInfo.mem_title);
      } catch (e) {
        this.$q.notify('회원 정보를 저장하지 못했습니다 ㅠㅠ. 관리자에게 문의해 주세요.')
      }
    },
    next() {
      if (this.userType === 'nomal') {
        this.navigateTo('/joi0160');
      } else if (this.userType === 'pro') {
        this.navigateTo('/joi0160');
      } else if (this.userType === 'enterprise') {
        this.navigateTo('/joi0160/enterprise');
      }
    }
  },
  computed: {
    userType() {
      return localStorage.getItem('user_mode')
    }
  }
}
</script>

<template>
  <div class="joi-0150-view">
    <title-top-bar :back-button="false" :title-text="'가입 완료'"></title-top-bar>
    <section>
      <h1 class="headline-1">
        {{ userId }}님<br>
        반가워요!<br>
      </h1>

      <p>
        {{ userId }}님을 좀 더 알고 싶어요. <br>
        다른 사람과 소통하고, <br>
        더 알맞는 정보를 추천하는데 <br>
        도움이 될 거에요. <br>
      </p>
    </section>

    <q-btn
      class="full-width main-bottom-btn"
      flat
      label="다음"
      rounded
      size="lg"
      style="background: var(--ga-red)"
      text-color="white"
      @click="next()"
    />
  </div>
</template>

<style scoped>
.joi-0150-view section {
  padding: 1.25rem 2.25rem;
}

.bottom-button-fixed {
  position: fixed;
  bottom: 0;
}

.joi-0150-view p {
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 155.556% */
}

.joi-0150-view .headline-1 {
  margin-bottom: 2.5rem;
}
</style>
