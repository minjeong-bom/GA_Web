<script>
import UserProfileThumb from 'components/profile/userProfileTumb.vue';
import timeAgo from 'src/script/timeData/timeAgo';
import {itemDelete} from 'src/script/api/deleteCall';

export default {
  name: 'commentId',
  components: {UserProfileThumb},
  props: {
    commentKey: String,
    writer: String,
    createdAt: String,
    userKey: String,
    commentContent: String,
  },
  data() {
    return {
      isMine: false,
      userType: '',
      userPosition: '',
      nickname: '',
    };
  },
  created() {
    if (this.userKey === this.storageUserKey) {
      this.isMine = true;
    }
    this.getDetailUserInfo();
  },
  computed: {
    createdTimeAgo() {
      return timeAgo.timeAgo(this.createdAt);
    },
    storageUserKey() {
      return localStorage.getItem('userKey');
    },
  },
  methods: {
    async getDetailUserInfo() {
      const config = {
        url: '/api/crud/lists/?order=desc_bc_regdate',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key2: 'IYETRHFC',
            bc_title: this.userKey,
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
        const result = res.data.response.lists[0];
        this.userType = result.bc_content.user_info.type;
        if (this.userType === 'nomal') {
          this.userPosition = result.bc_content.job.job_title;
        } else if (this.userType === 'pro') {
          this.userPosition = result.bc_content.job.pro_title;
        } else if (this.userType === 'enterprise') {
          this.userPosition = result.bc_content.pro.area;
        } else {
          return '';
        }

        this.nickname = result.bc_content.user_info.nickname;
      }
    },

    async deleteComment() {
      await itemDelete(this.commentKey);
      this.$q.notify('댓글이 삭제되었습니다.');
      this.$emit('reloadList');
    },
    editComment() {
      this.$emit('editComment', this.commentKey, this.userKey, this.commentContent);
    },
    reportComment() {
      this.$q.notify('댓글 신고가 접수되었습니다');
    },
  },
};
</script>

<template>
  <div class="card-id-wrap">
    <!-- User Profile Image -->
    <user-profile-thumb v-if="userKey" :user-key="userKey" size="48px"></user-profile-thumb>
    <!-- Creater & Created Time -->
    <div class="l-column" style="width: 100%">
      <!-- 00님이 -->
      <div class="created-user-and-lable">
        <div class="created-user-info-wrap card-headline-1">
          <span>{{ writer }}님</span>
        </div>
      </div>
      <!-- Badge + User Role Caption | Created Time -->
      <div class="user-badge-created-time-wrap">
        <img v-if="userType === 'pro'" alt="프로 뱃지" class="user-badge"
             src="../../assets/icon/person_assignment_24px.svg"/>
        <span class="card-caption-1">{{ userPosition }}</span>
        <span v-if="userType !== 'pro'" class="card-caption-2">|</span>
        <span class="card-caption-1">{{ createdTimeAgo }}</span>
      </div>
    </div>
    <q-btn flat icon="more_vert" round style="opacity: 0.5">
      <q-menu v-if="isMine" anchor="bottom left" fit self="top right">
        <q-list class="full-width">
          <q-item v-close-popup clickable>
            <div class="item-section" @click="editComment">수정하기</div>
          </q-item>
          <q-item v-close-popup clickable @click="deleteComment">
            <div class="item-section">삭제하기</div>
          </q-item>
        </q-list>
      </q-menu>
      <q-menu v-else anchor="bottom left" fit self="top right">
        <q-list class="full-width">
          <q-item v-close-popup clickable @click="reportComment">
            <div class="item-section">신고하기</div>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<style scoped>
.created-user-and-lable {
  gap: 0.625rem;
}

.created-user-info-wrap {
  span {
    margin-right: 0.1875rem;
  }
}

.user-badge-created-time-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.1875rem;
}

.card-id-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1875rem;
  margin-bottom: 0.5rem;
}

.item-section {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  font-size: 1rem;
}
</style>
