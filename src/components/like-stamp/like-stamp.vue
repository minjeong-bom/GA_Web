<script>
export default {
  name: "like-stamp",
  props: {
    articleKey: String,
    userKey: String,
  },
  data() {
    return {
      showLikeButtons: false,
      likes: [],
      myLike: '',
    }
  },
  created() {
    this.getLikeList();
  },
  methods: {
    async getLikeList() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            alias: "bc",
            prefix: "bc",
            scopes: "bc_key,bc_title,bc_regdate,bc_writer_name,bc_content",
            columns_opts : {
              bc_foreign_key2  : 'FWKOBTMQ',
              bc_title: this.articleKey,
            },
            limit : 5
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        this.likes = res.data.response.lists;
        this.checkMyLike();
      } catch (e) {
        console.error(e)
      }
    },
    checkMyLike() {
      this.myLike = this.likes.find(item => item.bc_writer_name === this.userKey);
      console.log('this.myLike', this.myLike)
    },
    async createLike(likeType) {
      let config
      try {
        if (this.myLike) {
          const delConfig = {
            url: '/api/crud/delete',
            body: {
              columns_opts : {
                data_key : this.myLike.bc_key,
              }
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom'
              }
            },
          }
          const res = await this.$api.post(delConfig.url, delConfig.body, delConfig.etc)

          config = {
            url: '/api/crud/create',
            body: {
              data_prefix : "bc",
              data_title: this.articleKey, // 게시글 키값
              data_foreign_key: 'IOFDAZME',
              data_foreign_key2: 'FWKOBTMQ',
              data_content: likeType, // 반응종류
              data_writer_name: this.userKey,
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom'
              }
            }
          }
        }
        else {
          config = {
            url: '/api/crud/create',
            body: {
              data_prefix : "bc",
              data_title: this.articleKey, // 게시글 키값
              data_foreign_key: 'IOFDAZME',
              data_foreign_key2: 'FWKOBTMQ',
              data_content: likeType, // 반응종류
              data_writer_name: this.userKey
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom'
              }
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        // this.getLikeList()
        this.$emit('getLikeList')
        if (res.status) {
          this.showLikeButtons = false
        }
      } catch (e) {
        console.error(e)
      }
    },
    openLikeList() {
      this.$router.push({ path: '/hom0111', query: { key: this.articleKey } })
    },
  },
}
</script>

<template>
  <div class="likes-list-area">
    <!-- Add Like -->
    <div class="add-likes-wrap">
      <q-btn size="14px" flat round style="background: #FD384E" @click="showLikeButtons = !showLikeButtons">
        <q-icon name="add" color="white"/>
      </q-btn>
      <div v-show="showLikeButtons" class="likes-button-group">
        <img class="like-button" src="../../assets/graphic/face-like.png" @click="createLike('like')"/>
        <img class="like-button" src="../../assets/graphic/face-sad.png" @click="createLike('sad')"/>
        <img class="like-button" src="../../assets/graphic/face-gido.png" @click="createLike('gido')"/>
        <img class="like-button" src="../../assets/graphic/face-angry.png" @click="createLike('angry')"/>
        <img class="like-button" src="../../assets/graphic/face-good.png" @click="createLike('good')"/>
      </div>
    </div>
    <!-- Like List -->
    <section class="liker-slide">
      <q-avatar v-for="item in likes" size="40px">
        <div class="user-profile-wrap"></div>
        <img class="imoji" :src="`src/assets/graphic/face-${item.bc_content}.png`">
      </q-avatar>
    </section>
    <!-- PageNation -->
    <q-btn flat round @click="openLikeList()">
      <q-icon name="navigate_next" style="opacity: 0.4;"/>
    </q-btn>
  </div>
</template>

<style scoped>
.add-likes-wrap {
  position: relative;
}

.likes-button-group {
  z-index: 10;
  position: absolute;
  top: -4rem;

  display: flex;
  height: 3.5rem;
  padding: 0rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.875rem;
  background: var(--bg-primary, #FFF);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}

.like-button {
  width: 42px;
  /* 기본 스타일 */
  transition: transform 1s ease-in-out;
}

.like-button:hover {
  /* 마우스 오버 시 크기 증가 */
  transform: scale(1.1); /* 10% 크기 증가 */
}

.likes-list-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.imoji {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px !important;
  height: 24px !important;
}

.liker-slide {
  display: flex;
  align-items: center;
  gap: 5px;
}

</style>
