<script>
export default {
  name: "BottomAppBar",
  data() {
    return {
      inHome: false,
      inSearch: false,
      inPosting: false,
      inMy: false,
      inAlarm: false,
    }
  },
  mounted() {
    this.checkIsPageName();
  },
  methods: {
    checkIsPageName() {
      const thisPage = this.$route.path
      if (thisPage === '/') {
        this.inHome = true
      }
    },
    goToMypage() {
      const userType = localStorage.getItem('user_mode');
      this.navigateTo('/mypage' + '/' + userType);
    },
    navigateTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<template>
  <div class="bottom-app-bar">
    <q-btn class="bottom-app-bar-item" flat>
      <div :class="{ 'focused-status' : inHome }" class="icon-wrap">
        <q-icon name="home"/>
      </div>
      <p :class="{ 'focused-status' : inHome }" class="lable" @click="navigateTo('/')">홈</p>
    </q-btn>
    <q-btn class="bottom-app-bar-item" flat @click="navigateTo('/search')">
      <div :class="{ 'focused-status' : inSearch }" class="icon-wrap">
        <q-icon name="search"/>
      </div>
      <p :class="{ 'focused-status' : inSearch }" class="lable">검색</p>
    </q-btn>
    <q-btn class="bottom-app-bar-item" flat @click="navigateTo('/posting')">
      <div :class="{ 'focused-status' : inPosting }" class="icon-wrap">
        <q-icon name="add_circle"/>
      </div>
      <p :class="{ 'focused-status' : inPosting }" class="lable">새글작성</p>
    </q-btn>
    <q-btn class="bottom-app-bar-item" flat>
      <div :class="{ 'focused-status' : inAlarm }" class="icon-wrap">
        <q-icon name="notifications"/>
      </div>
      <p :class="{ 'focused-status' : inAlarm }" class="lable">알림</p>
    </q-btn>
    <q-btn class="bottom-app-bar-item" flat @click="goToMypage()">
      <div :class="{ 'focused-status' : inMy }" class="icon-wrap">
        <q-icon name="emoji_emotions"/>
      </div>
      <p :class="{ 'focused-status' : inMy }" class="lable">마이</p>
    </q-btn>
  </div>
</template>

<style scoped>
.bottom-app-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 0rem 0.5rem;
  align-items: flex-start;
  width: 100%;

  background: #FFF;
  box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.25);
}

.bottom-app-bar-item {
  display: flex;
  padding: 0.75rem 0rem 1rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  flex: 1 0 0;
}

.icon-wrap {
  display: flex;
  width: 100%;
  height: 2rem;
  padding: 0.25rem 1.25rem;
  justify-content: center;
  align-items: center;
  color: #4C4C4C;
}

.lable {
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
  letter-spacing: 0.01563rem;
}

.focused-status {
  color: var(--ga-red) !important;
  font-weight: 700;
}
</style>
