<template>
  <div>
    <top-bar
      :title="'새글 작성'"
      :buttonStyle="'text'"
      :buttonText="'등록'"
      @buttonEvent="save">
    </top-bar>
  </div>
</template>

<script>
import { QuasarTiptap } from 'quasar-tiptap'
import 'quasar-tiptap/lib/index.css'
import TopBarSub from "components/common/TopBarSub.vue";
export default {
  components: {
    'top-bar': TopBarSub,
    'el-tiptap': ElementTiptap,
  },
  methods: {
    save() {
      window.alert('저장되었습니다!');
    },
  }
}
</script>

<style scoped>

</style>
