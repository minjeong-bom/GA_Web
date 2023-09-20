<template>
  <div>
    <top-bar
      :title="'새글 작성'"
      :buttonStyle="'text'"
      :buttonText="'등록'"
      @buttonEvent="save">
    </top-bar>
    <div>
      <section>
        <p>제목</p>
        <q-input v-model="title" :bg-color="'white'" :input-style="{ fontSize: '16px' }"/>
      </section>
      <section>
        <p>본문</p>
        <QuillEditor theme="bubble" :toolbar="toolbar" contentType="html" v-model:content="content"/>
      </section>
    </div>
  </div>
</template>

<script>
import TopBarSub from "components/common/TopBarSub.vue";

import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor,
    'top-bar': TopBarSub,
  },
  data() {
    return {
      content: "",
      title: "",
      file: "",
    }
  },
  methods: {
    save() {
      window.alert('저장되었습니다!');
    },
  },
  computed: {
    toolbar() {
      return [
        ['bold', 'underline', 'blockquote', {'header': 1}, {'header': 2}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, {'align': []}, 'image'],        // toggled buttons
      ];
    }
  }
}
</script>

<style scoped>
.editor-area {
  padding: 0 24px;
}

.content-html h1 {
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: red;
}

lable {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

section {
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0px 24px;
  margin-bottom: 20px;
}
</style>

<style>
/*.ql-editor {*/
/*  height: 300px;*/
/*  overflow-y: scroll;*/
/*  width: 100%;*/
/*}*/

/*.ql-toolbar.ql-snow {*/
/*  position: fixed;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  width: 100%;*/
/*  z-index: 999;*/
/*}*/
</style>
