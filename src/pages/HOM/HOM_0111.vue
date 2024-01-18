<script>

import {defineComponent} from "vue";
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default defineComponent({
  components: {TitleTopBar},
  data() {
    return {
      likes: [],
    }
  },
  mounted() {
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
            columns_opts: {
              bc_foreign_key2: 'FWKOBTMQ',
              bc_title: this.articleKey,
            },
            limit: 100
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const response = await this.$api.post(config.url, config.body, config.etc);
        const res = response.data.response.lists;

        this.replaceWriterNames(res);
      } catch (e) {
        console.error(e);
      }
    },
    async replaceWriterNames(array) {
      for (let item of array) {
        try {
          const res = await this.$api.post(
            `/api/crud/single/${item.bc_writer_name}`,
            {
              prefix: "mem",
              alias: "mem",
              scopes: "mem_title,mem_job"
            },
            {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom',
              }
            }
          )
          if (res.data.status === 'success') {
            item.bc_writer_name = res.data.response.view.mem_title;
            if (res.data.response.view.mem_job) {
              item.badgeTitle = res.data.response.view.mem_job
            } else {
              item.badgeTitle = "일반 회원" // job 정보가 등록되지 않은 회원은 일반 회원으로 표시
            }
          }
        } catch (e) {
          item.badgeTitle = "비공개 회원" // 삭제된 회원
        }
      }
      this.likes = array;
    }
  },
  computed: {
    articleKey() {
      return this.$route.query.key
    }
  }
})
</script>

<template>
  <div>
    <title-top-bar></title-top-bar>
    <div class="likes-list-page">
      <h1 class="headline-1">공감 목록</h1>
      <p class="card-caption-2">좋아요 및 공감 <span class="high-light">{{ likes.length }}</span>개</p>
      <section>
        <div v-for="item in likes" class="card-id-wrap">
          <!-- User Profile Image -->
          <div :style="`background-image: url(${item.profileImg});`" class="profile-wrap"></div>
          <!-- Creater & Created Time -->
          <div class="l-column" style="width: 100%">
            <!-- 00님이 000을 올렸어요 (하위메뉴) -->
            <div class="created-user-and-lable">
              <div class="created-user-info-wrap card-headline-1">
                <span>{{ item.bc_writer_name }}</span>
              </div>
            </div>
            <!-- Badge + User Role Caption | Created Time -->
            <div class="user-badge-created-time-wrap">
              <img class="user-badge" src="../../assets/icon/person_assignment_24px.svg"/>
              <span class="card-caption-1">{{ item.badgeTitle }}</span>
              <span v-show="item.createdAt" class="card-caption-2">|</span>
              <span v-show="item.createdAt" class="card-caption-1">{{ item.createdAt }}</span>
            </div>
          </div>
          <!-- Like image -->
          <img :src="`src/assets/graphic/face-${item.empathy_log_title}.png`" class="imoji">
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.likes-list-page {
  padding: 0 16px;
}

.imoji {
  width: 45px;
  height: 45px;
}

.card-id-wrap {
  padding: 10px 0;
}

.profile-wrap {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background-color: var(--grays-gray-2);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 30px;
}

.created-user-and-lable {
  gap: 0.625rem;
}

.created-user-info-wrap > span {
  margin-right: 0.1875rem;
}

.cartegory2-lable span {
  color: var(--grays-gray-2);
  font-size: 0.75rem;
}

.user-badge-created-time-wrap {
  display: inline-flex;
  padding: 0.125rem 0rem;
  align-items: center;
  gap: 0.1875rem;
}

.card-id-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1875rem;
  margin-bottom: 0.5rem;
}

.cartegory2-lable {
  display: inline-block;
  padding: 0.0625rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.25rem;
  border: 0.33px solid var(--fills-quartternary);
  background: var(--grays-gray-7);
}

</style>
