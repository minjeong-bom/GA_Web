<script>
import TextButtonTopBar from 'components/app-bar/TextButtonTopBar.vue';
import ProfileImageEditor from 'components/modal/profileImageEditor.vue';
import UserProfileThumb from 'components/profile/userProfileTumb.vue';
import {extractCityOrCounty} from '../../script/text/cityExtractor';

export default {
  name: 'MYP0000',
  components: {UserProfileThumb, ProfileImageEditor, TextButtonTopBar},
  data() {
    return {
      cityName: '',
      userDetailInfo: {
        user_info: {
          nickname: '',
          interesting: [],
          email: '',
          about: '',
        },
        job: {
          working: '',
          searching: '',
          searching_type: '',
          total_career: '',
          career_name: '',
          job_title: '',
        },
      },
      file: null, // 이미지 데이터
      thumbnailInfo: {
        type: '',
        imageKey: null,
        chatactor: null,
      },
      openProfileEditModal: false,
      myMenuList: [
        {
          lable: '내 게시글',
          linkTo: '/my-articles',
          iconClass: 'fa-book',
        },
        {
          lable: '내 이력서',
          linkTo: '/myr0000',
          iconClass: 'fa-id-card-clip',
        },
        {
          lable: '내 북마크',
          linkTo: '/myp3000',
          iconClass: 'fa-bookmark',
        },
        {
          lable: '1:1문의 사항',
          linkTo: '/myp4001',
          iconClass: 'fa-headset',
        },

      ]
    };
  },
  created() {
    this.getMyInfo();
    this.getDetailUserInfo();
  },
  methods: {
    setThumbnail() {
      this.openProfileEditModal = true;
    },
    closeModal() {
      this.openProfileEditModal = false;
      this.$router.go(0);
    },
    async getMyInfo() {
      try {
        const config = {
          url: `/api/crud/single/${this.localUserKey}`,
          body: {
            prefix: 'mem',
            alias: 'mem',
            scopes: 'mem_address',
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        };
        const response = await this.$api.post(config.url, config.body, config.etc);
        const res = response.data.response.view;

        this.address = res.mem_address;
        this.extractCityOrCounty();
      } catch (e) {
        this.$q.notify('정보를 불러오는데 실패했습니다.')
      }
    },
    async getDetailUserInfo() {
      const config = {
        url: '/api/crud/lists/',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key: 'AYZXHRWS',
            bc_foreign_key2: 'IYETRHFC',
            bc_title: this.localUserKey,
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
      const result = res.data.response.lists[0].bc_content;
      this.userDetailInfo = result;
    },
    uploadProfileImage() {
      if (this.file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const imageData = e.target.result.split(',')[1];

          const config = {
            url: '/api/crud/create',
            body: {
              data_prefix: 'bc',
              data_title: 'profile',
              data_foreign_key: 'QAACWXSQ',
              data_foreign_key2: 'UZPWQOWR',
              data_content: imageData,
              data_writer_name: 'TJXPOWQA',
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprinttest',
              },
            },
          };

          try {
            const result = await this.$api.post(config.url, config.body, config.etc);
            this.$emit('saveProfileImage', result.data.response.result.data_key);
          } catch (error) {
            this.$q.notify('이미지 저장 실패');
          }
        };

        reader.readAsDataURL(this.file);
      } else {
        alert('이미지를 선택해 주세요');
      }
    },
    extractCityOrCounty() {
      this.cityName = extractCityOrCounty(this.address);
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    triggerFileInput() {
      this.$refs.fileInput.pickFiles();
    },
    formattedContent(text) {
      return text.replace(/\n/g, '<br>');
    },
  },
  computed: {
    localUserKey() {
      return localStorage.getItem('userKey');
    },
    localUserName() {
      return localStorage.getItem('userName');
    },
    userJobStatus() {
      const firstStaus = this.userDetailInfo.job.working === '네' ? '현업 종사' : '';
      const secondStatus = this.userDetailInfo.job.searching === '네' ? '이직 준비중' : '전직 준비중';
      if (firstStaus && secondStatus) {
        return `${firstStaus} 및 ${secondStatus}`;
      }
      return firstStaus + secondStatus;
    },
  },
  watch: {
    file(newFile, oldFile) {
      if (newFile !== oldFile) {
        this.uploadProfileImage();
      }
    },
  }
};
</script>

<template>
  <div>
    <text-button-top-bar
      button-name="정보 수정"
      title-text="마이 페이지"
      @action="navigateTo('/myp0000/edit')"
    />

    <section class="user-info-wrap">
      <div class="user-thumbnail-wrap">
        <div>
          <user-profile-thumb :user-key="localUserKey" size="6rem"/>
        </div>
        <q-btn
          class="upload-photo" dense flat icon="photo_camera"
          round
          size="sm"
          style="background: #fff"
          @click="setThumbnail"
        />
        <profile-image-editor v-if="openProfileEditModal" @closeModal="closeModal"/>
      </div>
      <div class="l-column user-detail-info text-align-center">
        <h2 class="user-name-text">{{ localUserName }}</h2>
        <p class="sub-title-2">{{ userDetailInfo.job.job_title }}</p>
        <p class="user-personal-info">
          {{ userJobStatus }}<span v-if="cityName"> | {{ cityName }}</span></p>
        <p class="user-personal-info">{{ userDetailInfo.user_info.email }}</p>
      </div>
    </section>
    <section class="point-section">
      <div class="my-point-overview">
        <div>
          <p class="caption-1">활동지수</p>
          <span class="card-headline-1">000,000</span>
          <q-btn dense flat icon="chevron_right" size="xs"></q-btn>
        </div>
        <div>
          <p class="caption-1">활동지수</p>
          <span class="card-headline-1">000,000</span>
          <q-btn dense flat icon="chevron_right" size="xs"></q-btn>
        </div>
        <div>
          <p class="caption-1">활동지수</p>
          <span class="card-headline-1">000,000</span>
          <q-btn dense flat icon="chevron_right" size="xs"></q-btn>
        </div>
      </div>
    </section>
    <section class="point-section">
      <p v-if="!userDetailInfo.user_info.about">
        아직 {{ localUserName }}의 소개글이 없습니다.<br>
        100자 이내의 간단한 소개로 자신을 알려 보세요.
      </p>
      <p v-else class="footnote" v-html="formattedContent(userDetailInfo.user_info.about)"></p>
    </section>
    <section class="point-section">
      <p>주요 경력과 역량</p>
      <div class="my-propose-text-area l-column sub-title-1">
        {{ userDetailInfo.job.job_title }}(으)로 {{ userDetailInfo.job.total_career }}년 <br>
        {{ userDetailInfo.job.career_name }}
        <q-btn dense disable flat size="md" style="color: var(--k-40)">더보기</q-btn>
      </div>
    </section>
    <section class="point-section">
      <p>관심사</p>
      <div class="sub-title-1 flex">
        <span v-for="item in userDetailInfo.user_info.interesting">
          {{ item }}
        </span>
      </div>
    </section>
    <section class="my-menu-list">
      <div v-for="menu in myMenuList" class="my-menu flex-sb">
        <p class="flex-center">
          <p class="icon-wrapper">
            <i :class="'fa-solid' + ' ' + menu.iconClass"></i>
          </p>
          <span class="sub-title-2">{{ menu.lable }}</span>
        </p>
        <q-btn dense flat icon="chevron_right" size="xs" @click="navigateTo(menu.linkTo)"/>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
html, body, div, .q-layout {
  background: #F2F2F7 !important;
}

.user-info-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.4rem;

  .user-name-text {
    font-size: 1.3125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

.user-thumbnail-wrap {
  position: relative;
  width: 6.25rem;
  height: 6.25rem;

  .upload-photo {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.my-propose-text-area {
  padding: 0.625rem 0.75rem;
  align-items: flex-start;
  background: #fff !important;
  border-radius: 0.75rem;
}

.point-section {
  //.sub-title-1 {
  //  gap: 0.75rem;
  //}

  .footnote {
    color: #999;
    font-weight: 500;
  }
}


.user-personal-info {
  color: #999;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}

.point-section {
  padding: 16px;
}

.my-point-overview * {
  background: #fff !important;
}

.my-point-overview {
  display: flex;
  height: 4.25rem;
  padding: 0.8125rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;

  background: #fff !important;
  border-radius: 0.625rem;
}

.card-headline-1 {
  color: var(--ga-red);
}

.my-menu-list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.62rem;

  .flex-center {
    gap: 0.625rem;
  }

  .icon-wrapper {
    width: 1rem;
    text-align: center;
  }

  .my-menu {
    background: #fff !important;
    border-radius: 0.625rem;
    padding: 0.5625rem 1rem;
  }

  .sub-title-2 {
    color: #1C1C1C;
  }
}
</style>
