<template>
  <div class="footer iphone-x-ui-bottom">
    <div class="footer-menu-wrap">
      <div class="footer-menu">
        <q-btn dense flat label="회사 소개" @click="linkTo('https://companybb.com/')"/>
        <span>∙</span>
        <q-btn dense flat label="서비스 소개" @click="navigateTo('/ser0000')"/>
        <span>∙</span>
        <q-btn dense flat label="아용약관"/>
        <span>∙</span>
        <q-btn dense flat label="개인정보처리방침"/>
        <span>∙</span>
        <q-btn dense flat label="고객센터" @click="navigateTo('/cus0000')"/>
      </div>
    </div>

    <div class="sns-list">
      <img alt="페이스북 바로가기 아이콘" src="../assets/icon/ic_baseline-facebook.svg"/>
      <img alt="인스타스램 바로가기 아이콘" src="../assets/icon/ico_baseline-ig.svg"/>
      <img alt="블로그 바로가기 아이콘" src="../assets/icon/ico_baseline_blogger.svg"/>
    </div>

    <p class="info">
      주식회사 컴퍼니봄봄<br>
      서울특별시 성동구 뚝섬로1길 31, 13층 1304호 (서울숲 M타워)<br>
      대표자 장종균<br>
      사업자 등록번호 573-87-02507<br>
      직업정보중개업등록번호 573-87-02507<br>
    </p>

    <p class="copyright">
      Copyright 2023. CompanyBOMBOM Inc. all rights reserved.
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    linkTo(path) {
      window.open(path);
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.footer {
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: 30px 24px;
  padding-bottom: 100px !important;

  color: #938F96;
  font-size: 12px;
  background: #F4F4F4;

  gap: 16px;
}

.footer-menu {
  display: block;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.footer-menu button {
  display: inline-block;
  color: #938F96;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
}

.info {
  width: 100%;

  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 181.818% */
}

.copyright {
  width: 100%;
}

.sns-list {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

p {
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.footer-menu-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
