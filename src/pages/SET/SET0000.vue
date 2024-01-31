<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "SET0000",
  components: {TitleTopBar},
  data() {
    return {
      menuList: [
        {
          color: '',
          lable: '알림',
          iconClass: 'fa-bell',
          subLable: '',
          path: '/sep1000',
        },
        {
          color: '',
          lable: '앱 정보',
          iconClass: 'fa-info-circle',
          subLable: '',
        },
        {
          color: '',
          lable: '로그 아웃',
          iconClass: 'fa-arrow-right-from-bracket',
          subLable: '',
          action: 'logout',
          path: '/sep2000',
        },
        {
          color: '',
          lable: '회원 탈퇴',
          iconClass: 'fa-xmark',
          subLable: '',
          path: '/sep3000',
        },
      ]
    }
  },
  methods: {
    buttonEvent(action) {
      if (action === 'logout') {
        this.logout();
      }
    },
    logout() {
      localStorage.setItem('userKey', '');
      localStorage.setItem('userName', '');
      localStorage.setItem('userId', '');

      this.$router.push('/login');
      this.$q.notify('로그아웃 되었습니다');
    },
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="설정"></title-top-bar>
    <div>
      <div v-for="item in menuList">

        <q-btn class="full-width" flat @click="item.action ? buttonEvent(item.action) : this.$router.push(item.path)">
          <div class="menu-item">
            <div class="icon-lable-wrap">
              <div class="icon-frame flex-center">
                <i :class="item.iconClass" class="fa-solid"></i>
              </div>
              <span class="menu-lable-2">{{ item.lable }}</span>
            </div>
            <span v-if="item.subLable" class="footnote">{{ item.subLable }}</span>
          </div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fa-solid {
  font-size: 20px;
}

.icon-lable-wrap {
  display: flex;
  width: 50%;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
}

section {
  width: 100%;
}

.menu-item {
  display: flex;
  width: 100%;
  padding: 0.6rem 0;
  justify-content: space-between;
  align-items: center;
}

.footnote {
  color: var(--grays-gray);
}

.icon-frame {
  width: 2rem;
  height: 2rem;
}
</style>
