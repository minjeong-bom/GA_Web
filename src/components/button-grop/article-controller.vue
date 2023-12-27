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
      bookmarked: false,
      bookmarkData: '',
      sharedURL: '',
      fontSize: 2,
    }
  },
  mounted() {
    this.checkMarked()
    this.getFontSize()
  },
  methods: {
    async checkMarked() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_key,bc_title,bc_writer_name,bc_content',
            columns_opts: {
              bc_foreign_key: 'LBUSDDGP',
              bc_foreign_key2: 'SWMUCCYD',
              bc_title: this.articleKey
            }
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        if (res.data.response.lists) {
          const response = res.data.response.lists;
          const checkResult = response.find((item) => {
            return item.bc_writer_name !== undefined && item.bc_writer_name === this.userKey;
          });

          this.bookmarkData = checkResult;
          this.bookmarked = checkResult;
        }
      } catch (e) {
        console.error('북마크 되지 않은 페이지입니다.', e.message);
        this.bookmarked = false;
      }
    },
    async addBookmark() {
      try {
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'bc',
            data_title: this.articleKey, // 게시글 키
            data_foreign_key: 'LBUSDDGP',
            data_foreign_key2: 'SWMUCCYD',
            data_writer_name: this.userKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        await this.$api.post(config.url, config.body, config.etc);
        this.checkMarked();
      } catch (e) {
        console.log('북마크 저장 실패', e);
      }
    },
    async removeBookmark() {
      try {
        const config = {
          url: '/api/crud/delete',
          body: {
            "columns_opts": {
              "data_key": this.bookmarkData.bc_key
            }
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        await this.$api.post(config.url, config.body, config.etc);
        this.checkMarked();
      } catch (e) {
        console.log('북마크 삭제 실패', e);
      }
    },
    share() {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          Notify.create('클립보드에 복사되었습니다');
        })
        .catch((error) => {
          console.error('클립보드 복사 실패', error);
        });
    },
    setFontSize(size) {
      localStorage.setItem('articleFontSize', size);
      this.getFontSize();
      this.$emit('setFontSize');
    },
    getFontSize() {
      this.fontSize = parseInt(localStorage.getItem('articleFontSize')) || 2;
    }
  },
}
</script>

<template>
  <div class="article-controller-wrap">
    <div>
      <q-btn flat dense round icon="text_fields" style="opacity: 0.3" id="fontSizeSetButton">
        <q-menu max-width="500px" class="font-size-menu">
          <q-list class="font-size-option-list">
            <q-item
              clickable v-close-popup
              class="font-size-option"
              :class="{'focus': fontSize === 1}"
              @click="setFontSize(1)"
            >
              <div class="font-size-symbol font-size-1">가</div>
              <p class="comment-card-text">크기1</p>
            </q-item>
            <q-item
              clickable v-close-popup
              class="font-size-option"
              :class="{'focus': fontSize === 2}"
              @click="setFontSize(2)"
            >
              <div class="font-size-symbol font-size-2">가</div>
              <p class="comment-card-text">크기2</p>
            </q-item>
            <q-item
              clickable v-close-popup
              class="font-size-option"
              :class="{'focus': fontSize === 3}"
              @click="setFontSize(3)"
            >
              <div class="font-size-symbol font-size-3">가</div>
              <p class="comment-card-text">크기3</p>
            </q-item>
            <q-item
              clickable v-close-popup
              class="font-size-option"
              :class="{'focus': fontSize === 4}"
              @click="setFontSize(4)"
            >
              <div class="font-size-symbol font-size-4">가</div>
              <p class="comment-card-text">크기4</p>
            </q-item>
            <q-item
              clickable v-close-popup
              class="font-size-option"
              :class="{'focus': fontSize === 5}"
              @click="setFontSize(5)"
            >
              <div class="font-size-symbol font-size-5">가</div>
              <p class="comment-card-text">크기5</p>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <q-btn v-if="bookmarked" flat dense round icon="bookmark" @click="removeBookmark()" style="color: var(--ga-red)"/>
    <q-btn v-else flat dense round icon="bookmark" @click="addBookmark()" style="opacity: 0.3"/>
    <q-btn flat dense round icon="share" @click="share" style="opacity: 0.3"/>
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
