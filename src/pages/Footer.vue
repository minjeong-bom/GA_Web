<template>
  <div class="footer">
    <q-btn class="toggle-button" dense flat @click="toggleShowHide">
      <div class="toggle-inner flex-sb">
        <p class="caption-3">Copyright 2023. CompanyBOMBOM Inc. all rights reserved.</p>
        <q-btn v-show="!toggle" dense flat icon="arrow_drop_down" round/>
        <q-btn v-show="toggle" dense flat icon="arrow_drop_up" round/>
      </div>

    </q-btn>
    <div v-show="toggle" class="footer-info-wrap">
      <div class="footer-menu-wrap">
        <q-btn class="card-caption-2" dense flat label="회사 소개" @click="linkTo('https://companybb.com/')"/>
        <span>∙</span>
        <q-btn class="card-caption-2" dense flat label="서비스 소개" @click="navigateTo('/ser0000')"/>
        <span>∙</span>
        <q-btn class="card-caption-2" dense flat label="아용약관"/>
        <span>∙</span>
        <q-btn class="card-caption-2" dense flat label="개인정보처리방침" @click="navigateTo('/sep2000')"/>
        <span>∙</span>
        <q-btn class="card-caption-2" dense flat label="고객센터" @click="navigateTo('/cus0000')"/>
      </div>

      <div class="sns-list flex-center full-width">
        <img alt="페이스북 바로가기 아이콘" src="../assets/icon/ic_baseline-facebook.svg"/>
        <img alt="인스타스램 바로가기 아이콘" src="../assets/icon/ico_baseline-ig.svg"/>
        <img alt="블로그 바로가기 아이콘" src="../assets/icon/ico_baseline_blogger.svg"/>
      </div>

      <p class="info card-caption-2">
        주식회사 컴퍼니봄봄<br>
        서울특별시 성동구 뚝섬로1길 31, 13층 1304호 (서울숲 M타워)<br>
        대표자 장종균<br>
        사업자 등록번호 573-87-02507<br>
        직업정보중개업등록번호 573-87-02507<br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
    }
  },
  methods: {
    toggleShowHide() {
      this.toggle = !this.toggle;
      this.$nextTick(() => {
        if (this.toggle) {
          const currentScrollPosition = window.pageYOffset;
          const maxScroll = document.body.scrollHeight - window.innerHeight;

          if (currentScrollPosition < maxScroll) {
            window.scrollTo({
              top: currentScrollPosition + 200,
              behavior: 'smooth'
            });
          }
        }
      });
    },
    linkTo(path) {
      window.open(path);
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 1.75rem 1.5rem;
  padding-bottom: calc(1.5rem + 84px);

  color: #938F96;
  font-size: 12px;
  background: #F4F4F4;

  gap: 16px;

  .toggle-button {
    padding: 0;

    .toggle-inner {
      text-align: left;
    }
  }

  .footer-info-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .footer-menu-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      button {
        display: inline-flex;
        padding: 0;
      }
    }

    .toggle-down {
      color: #999;
    }

    .info {
      text-align: center;
    }
  }


}

.footer-menu {
  display: block;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.sns-list {
  gap: 30px;
}
</style>
