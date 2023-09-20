<template>
<div>
  <div class="top-bar iphone-x-ui-top" :class="{ 'menu' : menu }">
    <div class="tap-bar-inner" v-show="!menu">
      <img src="../../assets/brand/ga-logo.svg">
      <div class="button-box">
        <q-btn flat round color="primary" size="24" @click="this.menu = true">
          <i class="fa-solid fa-bars"></i>
        </q-btn>
      </div>
    </div>
    <div class="menu" v-if="menu">
      <div class="menu-close-wrap">
        <div class="button-box">
          <q-btn flat round color="primary" size="24" @click="this.menu = false">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </div>
      <div class="menu-contant-wrap iphone-x-ui-bottom">
        <h2>전체</h2>
        <div class="menu-list">
          <div class="menu-item" @click="nextTo('')">
            <label>서비스 소개</label>
            <caption></caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>스토리</label>
            <caption>일과 삶의 이야기</caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>취업 스킬</label>
            <caption>재취업에 도움되는 스토리</caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>지애’s Pick</label>
            <caption>추천 스토리</caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>마이페이지</label>
            <caption></caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>회원정보</label>
            <caption></caption>
          </div>
          <div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-user"></i>
              <label>회원정보</label>
            </div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-pencil"></i>
              <label>내 게시글</label>
            </div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-id-card"></i>
              <label>내 이력서</label>
            </div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-clipboard-question"></i>
              <label>1:1 문의사항</label>
            </div>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>공지사항</label>
            <caption></caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>이벤트</label>
            <caption></caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>고객센터</label>
            <caption>10:00~18:00</caption>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>서비스 정책</label>
            <caption></caption>
          </div>
          <div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-copyright"></i>
              <label>이용 약관</label>
            </div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-user-shield"></i>
              <label>개인정보 처리방침</label>
            </div>
          </div>
          <div class="menu-item" @click="nextTo('')">
            <label>설정</label>
            <caption></caption>
          </div>
          <div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-bell"></i>
              <label>알림</label>
            </div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-circle-info"></i>
              <label>앱 정보</label>
            </div>
            <div class="menu-item-sub" @click="nextTo('')">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <label>로그아웃</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  iphone-x-ui-bottom-->
</div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    nextTo(hash) {
      this.$route.push(hash);
    },
  },
  watch: {
  }
}
</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: calc(env(safe-area-inset-top) + 6px);
  padding-bottom: 6px;
  background-color: #fff;
  z-index: 1;
}

.tap-bar-inner {
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 9px;
  height: 100%;
  align-items: center;
}

button {
  width: 24px;
  height: 24px;

  border: 0;
  padding: 0;

  font-size: 20px;
  background-color: transparent;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
}

i {
  color: #000;
}

p {
  display: inline-block;

  margin-block-start: 0;
  margin-block-end: 0;

  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.menu {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.menu-close-wrap {
  display: flex;
  justify-content: right;
  padding-left: 24px;
  padding-right: 9px;
  height: 64px;
  align-items: center;
}

h2 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-block-start: 0;
  margin-block-end: 20px;
}

.menu-contant-wrap {
  padding: 0px 24px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
}

.menu-item label{
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.menu-item caption {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: #48464C;
}

.menu-item-sub {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 56px;
  padding-left: 20px;
  gap: 10px;
}

.menu-item-sub label {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  color: #79767D;
}

.menu-item-sub i {
  font-size: 18px;
  color: #79767D;
}
</style>
