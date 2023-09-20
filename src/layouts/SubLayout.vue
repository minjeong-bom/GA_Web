<template>
  <div>
    <q-layout>
      <!-- 컨텐츠 내용 -->
      <q-page-container class="contant-wrap">
        <router-view />
      </q-page-container>

      <!-- 하단바 -->
      <bottom-bar/>
    </q-layout>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";
import BottomBar from "components/common/BottomBar.vue";

const router = useRouter();

export default defineComponent({
  name: 'SubLayout',
  components: {
    'bottom-bar': BottomBar,
  },
  data() {
    return {
      pageTitle: "",
    }
  },
})
</script>

<style>
.contant-wrap {
  padding-top: 64px;
}

font-awesome-icon {
  color: black;
}
</style>
