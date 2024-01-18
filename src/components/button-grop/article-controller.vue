<script>
import {Notify} from 'quasar'

export default {
  name: "article-controller",
  props: {
    articleKey: String,
    userKey: String,
  },
  data() {
    return {
      isMarked: false,
      bookmarkKey: false,
      bookmarkedKey: '',
      sharedURL: '',
      fontSize: 2,
    }
  },
  mounted() {
    this.getLocalFontSize();
    this.checkBookmarkedPage();
  },
  methods: {
    async checkBookmarkedPage() {
      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_title,bc_content',
          columns_opts: {
            bc_foreign_key2: 'SWMUCCYD',
            bc_foreign_key: 'LBUSDDGP',
          },
          limit: 100
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }
      const result = await this.$api.post(config.url, config.body, config.etc);
      const res = result.data.response.lists;

      if (res) {
        const isMarked = res.some(item => item.bc_content === this.articleKey);
        this.isMarked = isMarked;
      }

      if (this.isMarked) {
        const marked = res.find(item => item.bc_content === this.articleKey);
        this.bookmarkKey = marked.bc_key;
        console.log(this.bookmarkKey)
      }
    },
    async addBookmark() {
      try {
        if (this.bookmarked) {
          return
        }
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'bc',
            data_title: this.userKey,
            data_foreign_key2: 'SWMUCCYD', // 게시판 키
            data_foreign_key: 'LBUSDDGP', // 카테고리 키
            data_content: this.articleKey,
            data_writer_name: this.userKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          }
        }
        const result = this.$api.post(config.url, config.body, config.etc);
        this.$q.notify('북마크에 추가되었습니다');
        this.isMarked = true;
      } catch (e) {
        this.$q.notify('네트워크 에러');
      }
    },
    async removeBookmark() {
      try {
        const delConfig = {
          url: '/api/crud/delete',
          body: {
            columns_opts: {
              data_key: this.bookmarkKey,
            }
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          },
        }
        const res = await this.$api.post(delConfig.url, delConfig.body, delConfig.etc);
        this.$q.notify('북마크가 삭제되었습니다');
        this.isMarked = false;
      } catch (e) {
        this.$q.notify('네트워크 에러');
      }
    },
    share() {
      const currentURL = window.location.href;
      this.sharedURL = currentURL;

      const inputElement = document.createElement('input');
      inputElement.value = this.sharedURL;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);

      this.$q.notify('클립보드에 복사되었습니다');
    },
    setFontSize(size) {
      localStorage.setItem('articleFontSize', size);
      this.getLocalFontSize();
      this.$emit('setFontSize');
    },
    getLocalFontSize() {
      this.fontSize = parseInt(localStorage.getItem('articleFontSize')) || 2;
    }
  },
}
</script>

<template>
  <div class="article-controller-wrap">
    <div>
      <q-btn id="fontSizeSetButton" dense flat icon="text_fields" round style="opacity: 0.3">
        <q-menu class="font-size-menu" max-width="500px">
          <q-list class="font-size-option-list">
            <q-item
              v-close-popup :class="{'focus': fontSize === 1}"
              class="font-size-option"
              clickable
              @click="setFontSize(1)">
              <div class="font-size-symbol font-size-1">가</div>
              <p class="comment-card-text">크기1</p>
            </q-item>
            <q-item
              v-close-popup :class="{'focus': fontSize === 2}"
              class="font-size-option"
              clickable
              @click="setFontSize(2)">
              <div class="font-size-symbol font-size-2">가</div>
              <p class="comment-card-text">크기2</p>
            </q-item>
            <q-item
              v-close-popup :class="{'focus': fontSize === 3}"
              class="font-size-option"
              clickable
              @click="setFontSize(3)">
              <div class="font-size-symbol font-size-3">가</div>
              <p class="comment-card-text">크기3</p>
            </q-item>
            <q-item
              v-close-popup :class="{'focus': fontSize === 4}"
              class="font-size-option"
              clickable
              @click="setFontSize(4)">
              <div class="font-size-symbol font-size-4">가</div>
              <p class="comment-card-text">크기4</p>
            </q-item>
            <q-item
              v-close-popup :class="{'focus': fontSize === 5}"
              class="font-size-option"
              clickable
              @click="setFontSize(5)">
              <div class="font-size-symbol font-size-5">가</div>
              <p class="comment-card-text">크기5</p>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <q-btn v-if="isMarked" dense flat icon="bookmark" round style="color: var(--ga-red)" @click="removeBookmark()"/>
    <q-btn v-else dense flat icon="bookmark" round style="opacity: 0.3" @click="addBookmark()"/>
    <q-btn dense flat icon="share" round style="opacity: 0.3" @click="share"/>
  </div>
</template>

<style scoped>
.article-controller-wrap {
  display: flex;
  gap: 24px;
  padding: 11px 16px;
}

.q-menu {
  max-width: 100%;
}

.font-size-option-menu {
  padding: 24px 22px;
}

.font-size-option-list {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.font-size-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
  padding: 0;
}

.font-size-symbol {
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid #e5e5ea;
  background: #fff;
}

.focus .font-size-symbol {
  background: var(--ga-red) !important;
  color: #fff !important;
}

.comment-card-text {
  color: var(--grays-gray);
}
</style>
