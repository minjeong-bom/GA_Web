<script>
export default {
  name: 'userProfileThumb',
  props: {
    userKey: String,
    size: {
      type: String,
      default: '32px',
    },
  },
  data() {
    return {
      imageInfo: {
        type: 'none',
        imageKey: '',
        avatarName: '',
        color: 'grey',
      },
      fileObject64: null,
      isLoading: true,
    };
  },
  created() {
    this.getProfileInfo();
  },
  methods: {
    onImageError() {
      console.log(this.userKey)
      this.imageInfo.type = 'none'; // 대체 이미지 경로
      this.imageInfo.color = 'grey'; // 대체 이미지 경로
    },
    async getProfileInfo() {
      try {
        const config = {
          url: '/api/crud/lists/',
          body: {
            alias: 'bc',
            prefix: 'bc',
            scopes: 'bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
            columns_opts: {
              bc_foreign_key2: 'XSKEQNCO',
              bc_foreign_key: 'DZVBYFPW',
              bc_title: this.userKey,
            },
            limit: 1,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };
        const res = await this.$api.post(config.url, config.body, config.etc);
        const result = res.data.response.lists[0];
        if (res) {
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
            await this.getThumbnail();
          }
        }
      } catch (e) {
        console.info('등록된 프로필 정보가 없었습니다.', this.userKey);
        this.imageInfo.type = 'none';
        this.imageInfo.color = 'pink-4';
        this.isLoading = false;
      }
    },
    async getThumbnail() {
      const config = {
        url: `/api/crud/single/${this.imageInfo.imageKey}`,
        body: {
          prefix: 'bc',
          alias: 'bc',
          scopes: 'bc_content',
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom',
          },
        },
      };

      const res = await this.$api.post(config.url, config.body, config.etc);
      this.fileObject64 = res.data.response.view.bc_content;
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div>
    <section class="profile-image-section">
      <div v-if="isLoading" class="profile-preview-wrap">
        <q-skeleton :style="`width:${size};height:${size};`" type="circle"/>
      </div>
      <div v-else :style="`width:${size};height:${size};`" class="profile-preview-wrap">
        <!-- 아바타 썸네일 -->
        <img v-if="imageInfo.type === 'avatar'"
             :alt="`동물 아이콘 프로필, ${imageInfo.avatarName} 아이콘`"
             :src="'resources/profile/' + imageInfo.avatarName + '.png'"
             class="avatar-preview"
             @error="onImageError">
        <!-- 업로드 이미지 썸네일 -->
        <img v-else-if="this.imageInfo.type === 'custom' && this.fileObject64"
             :src="`data:image/jpeg;base64,${fileObject64}`"
             alt="사용자 프로필 사진 영역"
             class="profile-preview">
        <!-- 설정된 이미지 없을 때 -->
        <q-avatar v-else :color="imageInfo.color" :size="size" icon="person"/>
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
