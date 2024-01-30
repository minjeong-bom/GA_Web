<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "SEP0000",
  components: {TitleTopBar},
  data() {
    return {
      menuList: [
        {
          color: '',
          lable: '이용 약관',
          iconClass: 'fa-book',
          subLable: '',
          path: '/sep1000',
        },
        {
          color: '',
          lable: '개인정보 처리방침',
          iconClass: 'fa-user',
          subLable: '',
          path: '/sep2000',
        },
      ]
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="서비스 정책"></title-top-bar>
    <div>
      <div v-for="item in menuList">
        <q-btn class="full-width" flat @click="this.$router.push(item.path)">
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
