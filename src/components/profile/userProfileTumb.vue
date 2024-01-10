<script>
import {convertToBase64} from "src/script/base64/fileToBase64";
export default {
  name: "userProfileThumb",
  props: {
    userKey: String,
    size: {
      type: String,
      default: '32px'
    }
  },
  data() {
    return {
      imageInfo: {
        type: 'none',
        imageKey: '',
        avatarName: '',
        color: '',
      },
      fileObject64: null,
      isLoading: true,
    }
  },
  mounted() {
    this.getProfileInfo();
  },
  methods: {
    async getProfileInfo() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            alias: "bc",
            prefix: "bc",
            scopes: "bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content",
            columns_opts : {
              bc_foreign_key2 : 'XSKEQNCO',
              bc_foreign_key : 'DZVBYFPW',
              bc_title : this.userKey
            },
            "limit" : 1
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        const res = await this.$api.post(config.url, config.body, config.etc);
        const result = res.data.response.lists[0];

        this.imageInfo.type = result.bc_content.type;
        if (this.imageInfo.type === 'none') {
          this.imageInfo.color = result.bc_content.color;
          this.isLoading = false;
        }
        if (this.imageInfo.type === 'avatar') {
          this.imageInfo.avatarName = result.bc_content.avatarName;
          this.isLoading = false;
        }
        if (this.imageInfo.type === 'custom') {
          this.imageInfo.imageKey = result.bc_content.imageKey;
          this.getThumbnail();
        }
      } catch (e) {
        console.error('등록된 프로필 정보가 없었습니다.', e);
        this.imageInfo.type = 'none';
        this.imageInfo.color = 'gray';
      }
    },
    async getThumbnail() {
      const config = {
        url: '/api/crud/single/' + this.imageInfo.imageKey,
        body: {
          prefix : 'bc',
          alias : 'bc',
          scopes : 'bc_content'
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }

      const res = await this.$api.post(config.url, config.body, config.etc);
      const response = res.data.response.view.bc_content;
      this.fileObject64 = response;
      this.isLoading = false;
    },
  },
}
</script>

<template>
  <div>
    <section class="profile-image-section">
      <div v-if="isLoading" class="profile-preview-wrap">
        <q-skeleton type="circle" :style="'width:' + size + ';' + 'height:' + size + ';'" />
      </div>
      <div v-else class="profile-preview-wrap" :style="'width:' + size + ';' + 'height:' + size + ';'">
        <!-- 아바타 썸네일 -->
        <img v-if="imageInfo.type === 'avatar'" class="avatar-preview" :src="'../../src/assets/graphic/profile/' + imageInfo.avatarName + '.png'">
        <!-- 업로드 이미지 썸네일 -->
        <img v-else-if="this.imageInfo.type === 'custom' && this.fileObject64" class="profile-preview" :src="'data:image/jpeg;base64,' + fileObject64">
        <!-- 설정된 이미지 없을 때 -->
        <q-avatar v-else icon="person" :color="imageInfo.color" :size="size"/>
      </div>
    </section>
  </div>
</template>

<style scoped>
.avatar-preview {
  width: 100%;
  height: 100%;
}

.profile-preview-wrap {
  border-radius: 100px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-preview {
  width: 100%;
}

.profile-image-section {
  display: flex;
  justify-content: center;
}
</style>
