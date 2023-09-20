<template>
  <div class="bottom-bar">
    <div class="bottom-nav">
      <div class="bottom-nav-item" :class="{ 'focus' : focus === 'home' }" @click="navigateTo('/')">
        <i class="fa-solid fa-house"></i>
        <label>홈</label>
      </div>
      <div class="bottom-nav-item" :class="{ 'focus' : focus === 'search' }" @click="navigateTo('search')">
        <i class="fa-solid fa-magnifying-glass"></i>
        <label>검색하기</label>
      </div>
      <div class="bottom-nav-item" :class="{ 'focus' : focus === 'posting' }" @click="navigateTo('posting')">
        <i class="fa-solid fa-feather-pointed"></i>
        <label>새글쓰기</label>
      </div>
      <div class="bottom-nav-item" :class="{ 'focus' : focus === 'alarms' }" @click="navigateTo('alarms')">
        <i class="fa-solid fa-bell"></i>
        <label>알람</label>
      </div>
      <div class="bottom-nav-item" :class="{ 'focus' : focus === 'mypage' }" @click="navigateTo('mypage')">
        <i class="fa-solid fa-user"></i>
        <label>마이</label>
      </div>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  data() {
    return {
      focus: 'home'
    }
  },
  created() {
    this.setFocusStyle();
  },
  methods: {
    navigateTo(pageHash) {
      this.$router.push(pageHash);
      this.$emit('setPageTitle', pageHash);

      // focus 변경
      this.setFocusStyle(pageHash)
    },
    setFocusStyle(pageHash) {
      if (pageHash) {
        this.focus = pageHash;
      } else {
        const hash = window.location.hash
        if (hash === '#/') {
          this.focus = 'home';
        } else {
          this.focus = hash.substring(2);
        }
      }
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-top: 8px;
  background-color: #fff;
  box-shadow: 0px -2px 10px #00000038;
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-nav {
  display: flex;
  align-items: center;
  height: 100%;
}

.bottom-nav-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;

  width: 25%;
  height: 70px;
}

.focus {
  color: #FD384E;
  font-weight: bold;
}
</style>
