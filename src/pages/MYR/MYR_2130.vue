<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  name: "MYR_2130",
  components: {TextButtonTopBar},
  props: {
    profileImage: String,
  },
  data() {
    return {
      uploadImage : '',
      selectedFile: '',
    }
  },
  mounted() {
    this.uploadImage = this.profileImage;
  },
  methods: {
    save() {
      this.uploadFile();
    },
    uploadFile() {
      if (this.selectedFile) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const imageData = e.target.result.split(',')[1];

          const config = {
            url: '/api/crud/create',
            body: {
              data_prefix: "bc",
              data_title: "profile",
              data_foreign_key: "QAACWXSQ",
              data_foreign_key2: "UZPWQOWR",
              data_content: imageData,
              data_writer_name: "TJXPOWQA"
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprinttest',
              }
            }
          };

          try {
            const result = await this.$api.post(config.url, config.body, config.etc);
            console.log('Upload successful', result);
            this.$emit('saveProfileImage', result.data.response.result.data_key);
          } catch (error) {
            console.error('Error uploading file', error);
          }
        };

        reader.readAsDataURL(this.selectedFile);
      } else {
        alert('Please select an image to upload.');
      }
    }
  },
  computed: {
    localUserKey() {
      return localStorage.getItem('userKey');
    }
  }
}
</script>

<template>
  <div class="myr-page">
    <text-button-top-bar :title-text="'이력서 작성'"></text-button-top-bar>
    <section class="sub-myr-view">
      <p class="full-width">
        <span class="sub-title-1">사진</span><br>
        <span class="footnote">
          많은 채용 전문가의 말에 따르면...<br>
          사진은 첫인상을 좌우하는 결정적 요인이에요.<br>
          목표 업종과 직무에 맞는 사진을 선택하는 것이 중요해요.
          보통 3X4 비율의 반명함판 사진을 많이 사용해요.
        </span>
      </p>

      <q-file filled bottom-slots class="full-width" v-model="selectedFile" label="프로필 사진" counter>
        <template v-slot:prepend>
          <q-icon name="add_a_photo"/>
        </template>
        <template v-slot:append >
          <q-icon v-if="selectedFile" name="close" @click.stop.prevent="selectedFile = null" class="cursor-pointer"/>
        </template>
        <template v-slot:hint>
          png, jpeg만 가능
        </template>
      </q-file>

      <q-btn
        flat
        rounded
        size="lg"
        @click="save()"
        :disable="!selectedFile"
        label="저장"
        class="full-width myr-modal-save-button nomal-text-3"/>
    </section>


  </div>
</template>

<style>
.nomal-text-3 {
  font-weight: 600 !important;
}

</style>

<style scoped>
.bottom-fixed-btn {
  position: fixed;
  bottom: 0;
}

.footnote {
  color: #808080;
}

.btn-upload-profile {
  display: flex;
  width: 13.125rem;
  height: 17.5rem;
  padding: 0rem 4.28125rem 0rem 4.34375rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border: none;
  border-radius: 0.75rem;
  background: var(--BG-Secondary);

  color: var(--ga-red);
}
</style>
