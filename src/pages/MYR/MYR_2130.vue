<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import MyrTextButtonTopBar from "components/app-bar/MyrTextButtonTopBar.vue";

export default {
  name: "MYR_2130",
  components: {MyrTextButtonTopBar, TextButtonTopBar},
  props: {
    profileImage: String,
  },
  data() {
    return {
      uploadImage: '',
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
              data_writer_name: this.localUserKey
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprintcombom',
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
    },
    closeModal(closePath) {
      this.$emit('closeModal', closePath);
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
    <myr-text-button-top-bar back-path="myr2130" title-text="이력서 작성" @closeModal="closeModal"/>
    <section class="sub-myr-view">
      <p class="full-width">
        <span class="sub-title-1">사진</span><br>
        <span class="footnote">
          많은 채용 전문가의 말에 따르면...<br>
          사진은 첫인상을 좌우하는 결정적 요인이에요.<br>
          목표 업종과 직무에 맞는 사진을 선택하는 것이 중요해요.<br>
          보통 3X4 비율의 반명함판 사진을 많이 사용해요.
        </span>
      </p>

      <div v-if="uploadImage" class="upload-image-frame l-column">
        <img :src="'data:image/jpeg;base64,' + uploadImage" alt="새로운 프로필 사진">
        <q-btn class="delete-image-btn" color="primary" dense flat icon="delete" round @click="imageDelete"/>
      </div>
      <q-file v-else v-model="selectedFile" bottom-slots class="full-width" counter filled label="프로필 사진">
        <template v-slot:prepend>
          <q-icon name="add_a_photo"/>
        </template>
        <template v-slot:append>
          <q-icon v-if="selectedFile" class="cursor-pointer" name="close" @click.stop.prevent="selectedFile = null"/>
        </template>
        <template v-slot:hint>
          png, jpeg만 가능
        </template>
      </q-file>

      <q-btn
        :disable="!selectedFile"
        class="full-width myr-modal-save-button nomal-text-3 bottom-fixed-btn"
        flat
        label="저장"
        rounded
        size="lg"
        @click="save()"/>
    </section>


  </div>
</template>

<style>
.nomal-text-3 {
  font-weight: 600 !important;
}

</style>

<style lang="scss" scoped>
.upload-image-frame {
  position: relative;

  width: 200px;
  height: 300px;
  padding: 4px;
  border: 1px solid #c9c9c9;
  border-radius: 8px;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }

  .delete-image-btn {
    position: absolute;
    right: 0;
    top: 0;

    background: #fff;
  }
}

.footnote {
  color: #808080;
}
</style>
