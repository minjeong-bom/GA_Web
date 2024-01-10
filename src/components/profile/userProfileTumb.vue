<script>
import {convertToBase64} from "src/script/base64/fileToBase64";
export default {
  name: "userProfileThumb",
  props: {
    userKey: String,
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
        }
        if (this.imageInfo.type === 'avatar') {
          this.imageInfo.avatarName = result.bc_content.avatarName;
        }
        if (this.imageInfo.type === 'custom') {
          this.imageInfo.imageKey = result.bc_content.imageKey;
        }
      } catch (e) {
        console.error('등록된 프로필 정보가 없었습니다.', e);
        await this.removeAvatar();
        await this.saveProfile();
      }
    },
    setAvatar(avatar) {
      this.imageInfo.type = 'avatar';
      this.imageInfo.avatarName = avatar + '_' + this.profileBackground;
      this.fileObject = null;
    },
    async convertObjectFile() {
      this.fileObject64 = await convertToBase64(this.fileObject);
    }
  },
}
</script>

<template>
  <div>
    <section class="profile-image-section">
      <div class="profile-preview-wrap">
        <!-- 아바타 썸네일 -->
        <img v-if="imageInfo.type === 'avatar'" class="avatar-preview" :src="'../../src/assets/graphic/profile/' + imageInfo.avatarName + '.png'">
        <!-- 업로드 이미지 썸네일 -->
        <img v-else-if="this.imageInfo.type === 'custom' && this.fileObject64" class="profile-preview" :src="fileObject64">
        <!-- 설정된 이미지 없을 때 -->
        <q-avatar v-else icon="person" :color="imageInfo.color" size="6rem"/>
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
  width: 6.25rem;
  height: 6.25rem;
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
