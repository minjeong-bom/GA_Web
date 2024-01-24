<script>
import UserProfileThumb from "components/profile/userProfileTumb.vue";

export default {
  name: "like-stamp",
  components: {UserProfileThumb},
  props: {
    articleKey: String,
    userKey: String,
  },
  data() {
    return {
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
          url: '/api/crud/lists/?order=desc_bc_regdate',
          body: {
            alias: "bc",
            prefix: "bc",
            scopes: "bc_key,bc_title,bc_regdate,bc_writer_name,bc_content",
            columns_opts: {
              bc_foreign_key2: 'FWKOBTMQ',
              bc_title: this.articleKey,
            },
            limit: 5
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        this.likes = res.data.response.lists;
        this.$emit('likesCount', this.likes.length);
        this.checkMyLike();
      } catch (e) {
        console.error('공감이 없는 게시글 입니다.', e.message);
        this.$emit('likesCount', 0);
      }
    },
    checkMyLike() {
      this.myLike = this.likes.find(item => item.bc_writer_name === this.userKey);
    },
    async createLike(likeType) {
      let config
      try {
        if (this.myLike) {
          const delConfig = {
            url: '/api/crud/delete',
            body: {
              columns_opts: {
                data_key: this.myLike.bc_key,
              }
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom'
              }
            },
          }
          await this.$api.post(delConfig.url, delConfig.body, delConfig.etc)

          config = {
            url: '/api/crud/create',
            body: {
              data_prefix: "bc",
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
        } else {
          config = {
            url: '/api/crud/create',
            body: {
              data_prefix: "bc",
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
        await this.$api.post(config.url, config.body, config.etc);
        await this.getLikeList();
        this.$emit('getLikeList');
      } catch (e) {
        console.error(e)
      }
    },
    openLikeList() {
      this.$router.push({path: '/hom0111', query: {key: this.articleKey}})
    },
  },
}
</script>

<template>
  <div class="likes-list-area">
    <!-- Add Like -->
    <div class="add-likes-wrap">
      <q-btn flat round size="14px" style="background: #FD384E">
        <q-icon color="white" name="add"/>
        <q-menu class="likes-button-group" max-width="500px">
          <q-list class="likes-button-list">
            <q-item v-close-popup class="likes-button-item" clickable>
              <img alt="like-button" class="like-button" src="../../assets/graphic/face-like.png"
                   @click="createLike('like')"/>
            </q-item>
            <q-item v-close-popup class="likes-button-item" clickable>
              <img alt="sad-button" class="like-button" src="../../assets/graphic/face-sad.png"
                   @click="createLike('sad')"/>
            </q-item>
            <q-item v-close-popup class="likes-button-item" clickable>
              <img alt="hope-button" class="like-button" src="../../assets/graphic/face-gido.png"
                   @click="createLike('gido')"/>
            </q-item>
            <q-item v-close-popup class="likes-button-item" clickable>
              <img alt="angry-button" class="like-button" src="../../assets/graphic/face-angry.png"
                   @click="createLike('angry')"/>
            </q-item>
            <q-item v-close-popup class="likes-button-item" clickable>
              <img alt="good-button" class="like-button" src="../../assets/graphic/face-good.png"
                   @click="createLike('good')"/>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <!-- Like List -->
    <section class="liker-slide">
      <q-avatar v-for="item in likes" size="40px">
        <div class="user-profile-wrap">
          <user-profile-thumb :user-key="item.bc_writer_name"/>
        </div>
        <img v-if="item.bc_content" :alt="`감정 표현 - ${item.bc_content}`"
             :src="`/src/assets/graphic/face-${item.bc_content}.png`" class="imoji">
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
  display: flex;
  height: 3.5rem;
  padding: 0 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 1.875rem;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

.like-button {
  width: 45px;
  height: 45px;
}


.likes-list-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
}

.likes-button-list {
  display: flex;
  gap: 0.625rem;
  padding: 0 0.625rem;
}

.likes-button-item {
  padding: 0 !important;
}

q-item {
  padding: 0;
}
</style>
