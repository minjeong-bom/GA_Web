<script>
import {uploadFile} from "src/script/upload/uploadImage";
import {convertToBase64} from "src/script/base64/fileToBase64";
export default {
  name: "profileImageEditor",
  data() {
    return {
      profileKey: '',
      profileMode: true,
      avatarList: ['쥐', '소', '돼지', '호랑이', '용', '뱀', '말', '양', '원숭이', '닭', '고양이', '토끼'],
      fileObject: null,
      fileObject64: null,
      imageInfo: {
        type: 'none',
        imageKey: '',
        avatarName: '',
        color: '',
      },
      randomColor: ['red', 'blue', 'green', 'pink-8', 'pink', 'green-14', 'amber', 'orange', 'light-green-14', 'brown']
    }
  },
  created() {
    this.getProfileInfo();
  },
  computed: {
    profileBackground() {
      return this.profileMode ? 'light' : 'dark';
    },
    userName() {
      return localStorage.getItem('userName');
    },
    userKey() {
      return localStorage.getItem('userKey');
    }
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
        this.profileKey = result.bc_key;

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
    removeAvatar() {
      this.imageInfo.type = 'none';
      this.imageInfo.imageKey = '';
      this.imageInfo.avatarName = 'profile_nomal_person';
      this.fileObject = null;

      // 색상 이름 배열
      let randomIndex = Math.floor(Math.random() * this.randomColor.length); // 랜덤 인덱스 생성
      let randomColor = this.randomColor[randomIndex]; // 랜덤 색상 선택
      this.imageInfo.color = randomColor;
    },
    async triggerFileInput() {
      this.$refs.fileInput.pickFiles();
      this.imageInfo.type = 'custom';
    },
    async saveProfile() {
      try {
        // 커스텀 이미지 사용자는 이미지 먼저 업로드
        if (this.imageInfo.type === 'custom') {
          const imageUploadRes = await uploadFile(this.fileObject, 'Profile Image', this.storageUserKey, 'OMGJFLJR');
          this.imageInfo.imageKey = imageUploadRes.response.result.data_key;
        }

        let profileConfig = {
          url: '/api/crud/create',
          body: {
            data_prefix : 'bc',
            data_key: this.profileKey ? this.profileKey : null,
            data_title: this.userKey,
            data_foreign_key: 'DZVBYFPW',
            data_foreign_key2: 'XSKEQNCO',
            data_content: JSON.stringify(this.imageInfo),
            data_writer_name: this.userKey
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }
        console.log(profileConfig)
        const result = await this.$api.post(profileConfig.url, profileConfig.body, profileConfig.etc);
        this.$q.notify('프로필 사진이 변경되었습니다.');
        this.$emit('closeModal');
      } catch (e) {
        console.error(e);
        this.$q.notify('프로필 사진 변경 실패');
      }
    },
    async convertObjectFile() {
      this.fileObject64 = await convertToBase64(this.fileObject);
    }
  },
  watch: {
    fileObject(newVal) {
      if (newVal) {
        this.convertObjectFile();
      }
    }
  }
}
</script>

<template>
  <div class="modal-background">
    <div class="shadow" @click="this.$emit('closeModal')"></div>
    <div class="flex-center absolute-bottom">
      <div class="modal-surface">
        <p class="headline-3">
          {{ userName }}님, <br>
          프로필 이미지를 꾸며보세요
        </p>
        <div class="profile-setting-options">
          <!-- 프로필 이미지 미리보기 -->
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

          <!-- 프로필 이미지 설정 : 어두운 배경 / 밝은 배경 -->
          <section>
            <div class="flex-center">
              <q-item-label class="caption-1">어둡게</q-item-label>
              <q-toggle v-model="profileMode" color="red"/>
              <q-item-label class="caption-1">밝게</q-item-label>
            </div>
          </section>

          <!-- 프로필 설정 버튼 그룹 -->
          <section class="gap-18">
            <!-- 이미지 등록 버튼 -->
            <q-btn round flat
                   size="16px"
                   icon="photo_camera"
                   class="add-image"
                   @click="triggerFileInput"
            />
            <q-file
              ref="fileInput"
              v-model="fileObject"
              style="display: none"
            />

            <!-- 아바타 설정 버튼 -->
            <q-avatar size="48px" v-for="item in avatarList" @click="setAvatar(item)">
              <img :src="'../../src/assets/graphic/profile/' + item + '_' + profileBackground + '.png'">
            </q-avatar>
          </section>

          <div class="button-group">
            <q-btn rounded flat
                   label="지우기"
                   class="btn-cancel"
                   @click="removeAvatar"
            />
            <q-btn rounded flat
                   label="완료"
                   color="red"
                   class="btn-confirm"
                   @click="saveProfile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(76, 76, 76, 0.32) !important;
}

.avatar-preview {
  width: 100%;
  height: 100%;
}

.modal-background .shadow {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.modal-surface {
  width: 22rem;
  height: 37rem;
  padding: 2.5rem 1.5rem;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 1.75rem 1.75rem 0rem 0rem;
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
  padding-top: 2rem;
  display: flex;
  justify-content: center;
}

.profile-setting-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.add-image {
  background-color: #fff;
}

.gap-18 {
  display: flex;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.gap-18>div {
  flex-shrink: 0;
}

.button-group {
  display: flex;
  gap: 16px;
}

.button-group>button {
  width: 50%;

  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.btn-cancel {
  background-color: #424242;
  color: #fff;
}

.btn-confirm {
  background-color: var(--ga-red);
  color: #fff !important;
}
</style>
