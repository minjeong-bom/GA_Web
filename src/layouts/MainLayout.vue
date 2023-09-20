<template>
  <div>
    <q-layout>
      <q-page-container class="content-container">
        <router-view />
        <footer-view />
      </q-page-container>

      <!-- 하단바 -->
      <bottom-bar />
    </q-layout>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import Footer from 'pages/Footer.vue'
import TopBarMain from "components/common/TopBarMain.vue";
import BottomBar from '../components/common/BottomBar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    'footer-view': Footer,
    'top-bar': TopBarMain,
    'bottom-bar': BottomBar,
  },
  setup () {

  }
})
</script>

<style>
.content-container {
  padding-top: 64px;
}
font-awesome-icon {
  color: black;
}
</style>
