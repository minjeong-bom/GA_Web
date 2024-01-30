<template>
  <div class="posting-view">
    <TextButtonTopBar button-name="등록" title-text="새글 작성" @action="save"/>
    <div class="editor-surface">
      <!-- 카테고리 -->
      <q-select v-model="category1" :options="options" class="category-select"/>
      <!-- 제목 -->
      <q-input v-model="title" class="title-input" maxlength="40" placeholder="제목 (최대 40자)"/>
      <!-- 본문 -->
      <q-editor
        v-model="content.body"
        :toolbar="[
        ['bold', 'italic', 'strike', 'underline', {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            // options: ['p', 'h1', 'h2', 'h3']
          },
         'unordered', 'ordered',
        ], ['upload']
      ]"/>
      <!-- 태그 목록 -->
      <div class="tag-list">
        <q-chip
          v-if="content.tags[0]"
          v-model="content.tags[0]"
          :label="content.tags[0]"
          :model-value="true"
          color="primary"
          icon="tag"
          removable
          text-color="white"
        />
        <q-chip
          v-if="content.tags[1]"
          v-model="content.tags[1]"
          :label="content.tags[1]"
          :model-value="true"
          color="primary"
          icon="tag"
          removable
          text-color="white"
        />
        <q-chip
          v-if="content.tags[2]"
          v-model="content.tags[2]"
          :label="content.tags[2]"
          :model-value="true"
          color="primary"
          icon="tag"
          removable
          text-color="white"
        />
      </div>
      <!-- 태그 추가 -->
      <q-input
        v-model="inputTag"
        borderless
        input-style="font-size: 0.875rem;"
        maxlength="40"
        placeholder="태그 입력"
        @keyup.enter="addTag">
        <template v-slot:append>
          <q-btn color="primary" dense flat label="추가" rounded @click="addTag"/>
        </template>
      </q-input>
      <!-- 파일 업로드 -->
      <q-file v-model="thumbnail" label="썸네일 업로드" outlined>
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
import {uploadFile} from "src/script/upload/uploadImage";
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  components: {
    TextButtonTopBar,
  },
  data() {
    return {
      articleKey: '',
      category1: '스토리',
      options: ['스토리'],
      content: {
        body: '',
        tags: [],
        thumbnailKey: '',
      },
      title: '',
      file: '',
      errorText: {
        title: false,
        content: false,
      },
      thumbnail: '',
      dense: ref(false),
      categoryList: [],
      inputTag: '',
      getThumbKey: '',
      getThumb: '',
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
  mounted() {
    this.articleKey = this.$route.query.key;
    this.getArticleContent();
  },
  methods: {
    async getArticleContent() {
      try {
        const config = {
          url: '/api/crud/single/' + this.articleKey,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_title,bc_count,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc)
        this.isLoading = false;
        const content = res.data.response.view

        this.title = content.bc_content.title;
        this.content.body = content.bc_content.body;
        this.content.tags = content.bc_content.tags;
        this.getThumbKey = content.bc_content.thumbnailKey;

        await this.getThumbnail();
        await this.getCreaterInfo();
      } catch (e) {
        this.isLoading = false;
      }
    },
    async getThumbnail() {
      if (!this.getThumbKey) {
        return
      }
      this.isLoading = true;
      try {
        const config = {
          url: '/api/crud/single/' + this.getThumbKey,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }
        const result = await this.$api.post(config.url, config.body, config.etc);
        this.isLoading = false;
        this.getThumb = result.data.response.view.bc_content;
        this.thumbnailImageSource = `data:image/jpeg;base64,${this.getThumb}`;
      } catch (e) {
        console.error('썸네일이 없는 게시글입니다.', e);
        this.isLoading = false;
      }
    },
    async getCreaterInfo() {
      const config = {
        url: '/api/crud/lists/?order=desc_bc_regdate',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key2: 'IYETRHFC',
            bc_title: this.article.createrKey,
          },
          limit: 1
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }
      const res = await this.$api.post(config.url, config.body, config.etc);
      if (res) {
        const result = res.data.response.lists[0].bc_content;
        this.article.createrType = result.user_info.type;
        if (result.user_info.type === 'nomal') {
          this.article.createrName = result.user_info.nickname;
          this.article.createrJob = result.job.job_title ? result.job.job_title : '';
        } else if (result.user_info.type === 'pro') {
          this.article.createrName = result.user_info.nickname;
          this.article.createrJob = result.pro.area ? result.pro.area + ' 전문가' : '전문가';
        }

      } else {
        this.nickname = '비공개 회원';
      }
    },
    addTag() {
      this.content.tags = this.content.tags.filter(item => item !== false);

      if (this.inputTag === '') {
        return 0

      } else if (this.content.tags.length === 3) {
        this.$q.notify('태그는 최대 3개까지 추가할 수 있습니다');

      } else {
        this.content.tags.push(this.inputTag);
        this.inputTag = '';
      }
    },
    async save() {
      if (this.thumbnail) {
        const data_title = 'articleImage';
        const data_writer_name = this.userKey
        const data_foreign_key = 'FHGBWGLF' // 아티클 이미지 업로드 카테고리 키
        try {
          const response = await uploadFile(this.thumbnail, data_title, data_writer_name, data_foreign_key);
          // 서버에서 받은 응답 데이터를 이용하여 원하는 작업 수행
          this.content.thumbnailKey = response.response.result.data_key
        } catch (error) {
          // 에러 처리
          console.error('Error in uploadFile', error);
        }
      }

      try {
        const contentData = {
          title: this.title,
          body: this.content.body,
          tags: this.content.tags,
          thumbnailKey: this.content.thumbnailKey,
        };

        const config = {
          url: '/api/crud/create',
          body: {
            data_key: this.articleKey,
            data_prefix: 'bc',
            data_title: this.userKey,
            data_foreign_key: 'DPORHCPV', // '스토리' 카테고리 키
            data_foreign_key2: 'SNXKQEZS', // 게시판 키
            data_content: JSON.stringify(contentData),
            data_writer_name: this.userKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          }
        }

        await this.$api.post(config.url, config.body, config.etc);
        this.navigateTo('/');
      } catch (e) {
        this.$q.notify('게시글을 등록하지 못했습니다. 다시 시도해 주세요.');
        console.error(e);
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  computed: {
    userKey() {
      return localStorage.getItem('userKey');
    }
  }
}
</script>

<style lang="scss" scoped>

.posting-view {
  margin-bottom: 56px;

  .category-select, .title-input {
    font-size: 1rem;
    font-style: normal;
    font-weight: 600 !important;
    line-height: normal;
    letter-spacing: -0.01875rem;
  }

  .editor-surface {
    display: flex;
    padding: 0 1rem;
    flex-direction: column;
    gap: 0.3rem;
    background: #fff;
    margin-top: 10px;
  }
}
</style>
