<template>
  <div>
    <top-bar
      :title="'새글 작성'"
      :buttonStyle="'text'"
      :buttonText="'등록'"
      @buttonEvent="save">
    </top-bar>
    <div class="content-wrap">
      <section v-show="errorText.title || errorText.content">
        <p class="error-msg" v-show="errorText.title"><i class="fa-solid fa-check"></i> 제목을 입력해 주세요</p>
        <p class="error-msg" v-show="errorText.content"><i class="fa-solid fa-check"></i> 본문을 입력해 주세요</p>
      </section>
      <section>
        <span class="lable-text">제목</span>
        <div class="title-input-wrap">
          <input class="title-input" v-model="title" placeholder="제목">
          <div class="clear-button-wrap" v-show="title" @click="clearTitleFilde">
            <i class="fa-solid fa-circle-xmark"></i>
          </div>
        </div>
      </section>
      <section>
        <span class="lable-text">본문</span>
        <QuillEditor theme="snow" :toolbar="toolbar" contentType="html" v-model:content="content"/>
        <p>
          {{ content }}
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import TopBarSub from "components/common/TopBarSub.vue";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    QuillEditor,
    'top-bar': TopBarSub,
  },
  data() {
    return {
      content: '',
      title: '',
      file: '',
      errorText: {
        title: false,
        content: false,
      }
    }
  },
  mounted() {

  },
  methods: {
    save() {
      // 벨리데이션 체크
      if (this.title === '') {
        this.errorText.title = true;
      }
      if (this.content === "") {
        this.errorText.content = true;
      }
    },
    clearTitleFilde() {
      this.title = '';
    }
  },
  computed: {
    toolbar() {
      return [
        ['bold', 'underline', 'blockquote', {'header': 1}, {'header': 2}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, {'align': []}, 'image'],        // toggled buttons
      ];
    },
  },
}
</script>

<style scoped>
.editor-area {
  padding: 0 24px;
}

.error-msg {
  color: #FD384E;
  line-height: 1.2;
  margin-block-end: 0;
}

.title-input {
  padding: 12px;
  border-radius: 12px;
  border: 0px solid;
  background: #E6E5E8;
  font-size: 16px;
  border: 1px solid #fff;
  font-weight: bold;

  transition: all 0.3s;
}

.title-input:focus {
  border-radius: 0;
  background: transparent;
  border-bottom: 1px solid #00b8d4;
  outline: none;
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
}

.content-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 24px;
}
</style>

<style>
.ql-container {
  border: 1px solid #fff !important;
  border-radius: 12px !important;
  height: 500px !important;
  background: #E6E5E8;
}

.ios-keyboard .ql-toolbar.ql-snow {
  z-index: 2;
  position: sticky;
  top: calc(env(safe-area-inset-top) + 61px);
  background-color: red !important;
  border: 0;
}

.ql-toolbar.ql-snow {
  z-index: 2;
  position: sticky;
  top: calc(env(safe-area-inset-top) + 61px);
  background-color: #fff !important;
  border: 0;
}

.ql-container h1 {
  font-weight: bold;
  margin-block-start: 0;
  margin-block-end: 0;
  line-height: 2;
  font-size: 1.4rem;
}

.ql-container h2 {
  font-weight: bold;
  margin-block-start: 0;
  margin-block-end: 0;
  line-height: 2;
  font-size: 1.2rem;
  color: #00b8d4;
}

.ql-container ol {
  padding-left: 0;
  font-size: 1.2rem;
}

.ql-container ul {
  font-size: 1.2rem;
}

.ql-container p {
  line-height: 2;
  font-size: 1.2rem;
}

.lable-text {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}

.focus-title {
  background: #fff;
  color: black;
}

.title-input-wrap {
  position: relative;
}

.title-input {
  width: 100%;
}

.clear-button-wrap {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  width: 54px;
  height: 100%;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  opacity: 0.3;
}
</style>
