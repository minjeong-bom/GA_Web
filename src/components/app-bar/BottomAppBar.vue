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
        this.inHome = true;
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<template>
  <div class="bottom-app-bar">
    <q-btn flat class="bottom-app-bar-item">
      <div class="icon-wrap" :class="{ 'focused-status' : inHome }">
        <q-icon name="home" />
      </div>
      <p class="lable" :class="{ 'focused-status' : inHome }" @click="navigateTo('/')">홈</p>
    </q-btn>
    <q-btn flat class="bottom-app-bar-item" @click="navigateTo('/search')">
      <div class="icon-wrap" :class="{ 'focused-status' : inSearch }">
        <q-icon name="search" />
      </div>
      <p class="lable" :class="{ 'focused-status' : inSearch }">검색</p>
    </q-btn>
    <q-btn flat class="bottom-app-bar-item" @click="navigateTo('/posting')">
      <div class="icon-wrap" :class="{ 'focused-status' : inPosting }">
        <q-icon name="add_circle" />
      </div>
      <p class="lable" :class="{ 'focused-status' : inPosting }">새글작성</p>
    </q-btn>
    <q-btn flat class="bottom-app-bar-item">
      <div class="icon-wrap" :class="{ 'focused-status' : inAlarm }">
        <q-icon name="notifications" />
      </div>
      <p class="lable" :class="{ 'focused-status' : inAlarm }">알림</p>
    </q-btn>
    <q-btn flat class="bottom-app-bar-item" @click="navigateTo('/myp0000')">
      <div class="icon-wrap" :class="{ 'focused-status' : inMy }">
        <q-icon name="emoji_emotions" />
      </div>
      <p class="lable" :class="{ 'focused-status' : inMy }">마이</p>
    </q-btn>
  </div>
</template>

<style scoped>
.bottom-app-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 0rem 0.5rem;
  align-items: flex-start;

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
