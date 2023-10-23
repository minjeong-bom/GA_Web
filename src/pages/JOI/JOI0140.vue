<template>
  <div>
    <topbar :title="'약관 동의'"></topbar>
    <section>
      <div class="check-button">
        <div class="check-item" @click="check('all')">
          <i class="fa-solid fa-check"></i>
          <p>
            약관에 모두 동의
          </p>
        </div>
      </div>
      <div class="check-button">
        <div class="check-item" @click="check('service')">
          <i class="fa-solid fa-check"></i>
          <p>
            서비스 이용 약관 동의
          </p>
        </div>
        <button>
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <div class="check-button">
        <div class="check-item" @click="check('userinfo')">
          <i class="fa-solid fa-check"></i>
          <p>
            개인정보 처리방침 동의
          </p>
        </div>
        <button>
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <button>다음</button>
    </section>
  </div>
</template>

<script>
import TopBarSub from "components/common/TopBarSub.vue";
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
  }
}
</script>

<style scoped>
section {
  padding: 0 20px;
}

.check-button {
  display: flex;
  padding: 14px 10px;
  justify-content: space-between;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-item p {
  margin-block-start: 0;
  margin-block-end: 0;
}

.check-button button {
  text-align: right;
  width: 64px;
  border: 0;
  background: transparent;
}
</style>
