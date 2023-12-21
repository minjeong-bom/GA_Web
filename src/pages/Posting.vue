<template>
  <div class="posting-view">
    <TextButtonTopBar :button-name="'등록'" :title-text="'새글 작성'" @action="save"></TextButtonTopBar>
    <div class="editor-surface">
      <!-- 카테고리 -->
      <q-select v-model="category1" :options="options" class="category-select"/>
      <!-- 제목 -->
      <q-input v-model="title" placeholder="제목 (최대 40자)" class="title-input" maxlength="40"/>
      <!-- 본문 -->
      <q-editor
        v-model="content.body"
        :toolbar="[
        ['bold', 'italic', 'strike', 'underline', {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
          },
         'unordered', 'ordered', 'outdent', 'indent'
        ],
      ]"/>
      <!-- 태그 입력 -->
      <q-input
        v-model="tags"
        borderless
        placeholder="태그 입력"
        maxlength="40"
        input-style="font-size: 0.875rem;"/>
      <!-- 파일 업로드 -->
      <q-file outlined v-model="thumbnail" label="썸네일 업로드">
        <template v-slot:prepend>
          <q-icon name="image"/>
        </template>
      </q-file>
    </div>
  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import {ref} from 'vue'
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  components: {
    TextButtonTopBar,
  },
  data() {
    return {
      category1: '스토리',
      options: ['스토리'],
      content: {
        body: '',
        tags: '',
        thumbnailKey: '',
      },
      title: '',
      file: '',
      tags: '',
      errorText: {
        title: false,
        content: false,
      },
      thumbnail: '',
      dense: ref(false),
      categoryList: [],
    }
  },
  setup() {
    const $q = useQuasar()
    return {
      editor: ref(''),
      saveWork() {
        $q.notify({
          message: 'Saved your text to local storage',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
        })
      },
      uploadIt() {
        $q.notify({
          message: 'Server unavailable. Check connectivity.',
          color: 'red-5',
          textColor: 'white',
          icon: 'warning'
        })
      }
    }
  },
  methods: {
    async save() {
      if (this.thumbnail) {

      }

      try {
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'bc',
            data_title: this.title,
            data_foreign_key: 'DPORHCPV', // 카테고리 (스토리)
            data_foreign_key2: 'SNXKQEZS', // 테이블
            data_content: this.content,
            data_writer_name: this.userKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprinttest',
            },
          }
        }
        await this.$api.post(config.url, config.body, config.etc);
        this.navigateTo('/');
      } catch (e) {
        window.alart('게시글 등록에 실패했습니다');
        console.error(e);
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  computed: {
    userKey() {
      return localStorage.getItem('userKey')
    }
  }
}
</script>

<style scoped>
.category-select {
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600 !important;
  line-height: normal;
  letter-spacing: -0.01875rem;
}

.title-input {
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.01875rem;
}

.posting-view {
  background: #F4F4F4;
  margin-bottom: 56px;
}

.editor-surface {
  display: flex;
  padding: 0rem 1rem;
  flex-direction: column;
  gap: 0.3125rem;
  background: #fff;
  margin-top: 10px;
}

</style>
