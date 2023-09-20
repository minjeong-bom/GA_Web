<template>
  <div class="footer iphone-x-ui-bottom">
    <div class="footer-menu-wrap">
      <div class="footer-menu">
        <span>회사 소개</span>
        <span>∙</span>
        <span>서비스 소개</span>
        <span>∙</span>
      </div>
      <div class="footer-menu">
        <span>이용약관</span>
        <span>∙</span>
        <span>개인정보처리방침</span>
        <span>∙</span>
        <span>고객센터</span>
      </div>
    </div>

    <div class="sns-list">
      <img src="../assets/icon/ic_baseline-facebook.svg"/>
      <img src="../assets/icon/ico_baseline-ig.svg"/>
      <img src="../assets/icon/ico_baseline_blogger.svg"/>
    </div>

    <p class="info">
      주식회사 컴퍼니봄봄<br>
      서울특별시 성동구 뚝섬로1길 31, 13층 1304호 (서울숲 M타워)<br>
      대표자 장종균<br>
      사업자 등록번호 573-87-02507<br>
      직업정보중개업등록번호  573-87-02507<br>
    </p>

    <p class="copyright">
      Copyright 2023. CompanyBOMBOM Inc. all rights reserved.
    </p>
  </div>
</template>

<script>

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
  padding-bottom: 100px;

  color: #938F96;
  font-size: 12px;
  background: #F4F4F4;

  gap: 16px;
}

.footer-menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.footer-menu span {
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
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.footer-menu-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
