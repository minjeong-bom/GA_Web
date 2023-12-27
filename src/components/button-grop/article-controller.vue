<script>
import { Notify } from 'quasar'
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
    }
  },
  mounted() {
    this.checkMarked()
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
              bc_foreign_key : 'LBUSDDGP',
              bc_foreign_key2 : 'SWMUCCYD',
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
        const res = await this.$api.post(config.url, config.body, config.etc);
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
            "columns_opts" : {
              "data_key" : this.bookmarkData.bc_key
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
      const currentURL = window.location.href;
      this.sharedURL = currentURL;
      this.copyToClipboard();

      this.$q.notify('클립보드에 복사되었습니다');
    },
    copyToClipboard() {
      // 텍스트를 클립보드에 복사하는 코드
      const inputElement = document.createElement('input');
      inputElement.value = this.sharedURL;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      document.body.removeChild(inputElement);
    },
    setFontSize() {
      this.$emit('setFontSize', )
    }
  }
}
</script>

<template>
  <div class="article-controller-wrap">
    <q-btn flat dense round icon="text_fields" style="opacity: 0.3"/>
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
</style>
