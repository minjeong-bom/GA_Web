<script>

import {defineComponent} from "vue";
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import UserProfileThumb from "components/profile/userProfileTumb.vue";
import timeAgo from "src/script/timeData/timeAgo";

export default defineComponent({
  components: {UserProfileThumb, TitleTopBar},
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
          url: '/api/crud/lists/?order=desc_bc_regdate',
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

        await this.replaceWriterNames(res);
      } catch (e) {
        console.error(e);
      }
    },
    createdTimeAgo(time) {
      return timeAgo.timeAgo(time);
    },
    async replaceWriterNames(array) {
      console.log(array)
      for (let item of array) {
        try {
          let config = {
            url: '/api/crud/lists/',
            body: {
              alias: 'bc',
              prefix: 'bc',
              scopes: 'bc_key,bc_content',
              columns_opts: {
                bc_foreign_key2: 'IYETRHFC',
                bc_title: item.bc_writer_name,
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

          const content = res.data.response.lists[0].bc_content;
          const userType = content.user_info.type ? content.user_info.type : 'nomal';

          item.user_mode = userType;
          if (content.user_info.nickname) {
            item.nickname = content.user_info.nickname;
          } else {
            item.nickname = '비공개 회원';
          }
          if (userType === 'nomal') {
            item.badgeTitle = content.job.job_title;
          } else if (userType === 'pro') {
            item.badgeTitle = content.pro.area;
          }

          this.isLoading = false;
        } catch (e) {
          item.nickname = '비공개 회원';
          item.badgeTitle = ''; // 삭제된 회원
          this.isLoading = false;
        }
      }
      this.likes = array;
    },

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
          <user-profile-thumb v-if="item.bc_writer_name" :user-key="item.bc_writer_name" size="48px"/>
          <!-- Creater & Created Time -->
          <div class="l-column" style="width: 100%">
            <!-- 00님이 000을 올렸어요 (하위메뉴) -->
            <div class="created-user-and-lable">
              <div class="created-user-info-wrap card-headline-1">
                <span>{{ item.nickname }}</span>
              </div>
            </div>
            <!-- Badge + User Role Caption | Created Time -->
            <div class="user-badge-created-time-wrap">
              <!--              <img alt="일반 사용자 뱃지" class="user-badge" src="../../assets/icon/person_assignment_24px.svg"/>-->
              <span class="card-caption-1">{{ item.badgeTitle }}</span>
              <span v-show="item.bc_regdate" class="card-caption-2">|</span>
              <span v-show="item.bc_regdate" class="card-caption-1">{{ createdTimeAgo(item.bc_regdate) }}</span>
            </div>
          </div>
          <!-- Like image -->
          <img :alt="`${item.empathy_log_title} 이모지 이미지`" :src="`src/assets/graphic/face-${item.bc_content}.png`"
               class="imoji">
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
  padding: 0.125rem 0;
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
</style>
