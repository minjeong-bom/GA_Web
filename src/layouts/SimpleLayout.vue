<template>
  <div>
    <q-layout class="iphone-x-ui-top">
      <!-- 컨텐츠 내용 -->
      <q-page-container class="contant-wrap">
        <router-view class="iphone-x-ui-bottom" />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();

export default defineComponent({
  name: 'TopLayout',
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
