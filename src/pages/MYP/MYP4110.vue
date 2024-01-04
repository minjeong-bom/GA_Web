<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import ConfilrmDialog from "components/modal/confilrmDialog.vue";
import IconAlart from "components/modal/iconAlart.vue";
import {uploadFile} from "../../script/upload/uploadReportFiles";
export default {
  name: "MYP4110",
  components: {IconAlart, ConfilrmDialog, TitleTopBar},
  data() {
    return {
      title: '',
      content: '',
      files: [],
      uploadFilesKey: [],
      checkVal: false,
      checkDescription: '',
      isLoading: false,
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.pickFiles();
    },
    async uploadFiles() {
      debugger

    },
    async save() {
      let allUploadsSuccessful = true;

      if (!this.title || !this.content) {
        this.openModal('제목과 내용을 입력해주세요.')
        return
      } else if (this.files.length > 3) {
        this.openModal('파일은 3개까지 업로드 할 수 있습니다.')
        return
      } else if (this.files) {
        for (let i = 0; i < this.files.length; i++) {
          try {
            const response = await uploadFile(this.files[i], "1:1 문의 이미지", this.storageUserKey, "LVSXZTLQ");
            this.uploadFilesKey.push(response.response.result.data_key);
            console.log(this.uploadFilesKey);
          } catch (e) {
            console.error('파일 업로드 실패', e);
            allUploadsSuccessful = false;
            break; // 업로드 실패 시 for 루프 중단
          }
        }
      }
      if (allUploadsSuccessful) {
        try {
          const content = [
            this.title, // 문의 제목
            this.content,  // 문의 내용
            "", // 관리자 답변
            this.uploadFilesKey, // 첨부파일 업로드 키
            "", // 문의 유형
          ]

          const config = {
            url: '/api/crud/create',
            body: {
              data_prefix : "bc",
              data_title: this.storageUserKey,
              data_foreign_key: "IOZOZWFG",
              data_foreign_key2: "ZRBTGTEX",
              data_content: JSON.stringify(content),
              data_writer_name: this.storageUserKey,
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprinttest',
              }
            }
          }

          const res = await this.$api.post(config.url, config.body, config.etc);
          this.isLoading = false;
          this.$q.notify('1:1 문의가 등록되었습니다');
          this.$router.push({ path: '/myp4120', query: { key: res.data.response.result.data_key } });
        } catch (e) {
          this.$q.notify('1:1 문의를 등록할 수 없습니다. 관리자에게 문의해주세요.');
          console.error('1:1 문의글 등록 실패', e);
        }
        console.log(this.title, this.content, this.files);
      }
    },
    formatFileSize(size) {
      const sizeInMB = size / (1024 * 1024);
      if (sizeInMB < 0.1) {
        return size + ' Bytes'; // 0.1MB 이하인 경우 바이트 단위로 표시
      } else {
        return sizeInMB.toFixed(2) + ' MB'; // 그 외의 경우 메가바이트 단위로 표시
      }
    },
    deleteFile(index) {
      this.files.splice(index, 1);
    },
    openModal(message) {
      this.checkDescription = message;
      this.checkVal = true;
    },
    closeModal() {
      this.checkVal = false;
    }
  },
  computed: {
    storageUserKey() {
      return localStorage.getItem('userKey');
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="1:1 문의하기"></title-top-bar>
    <section class="nomal-page-layout l-column">

      <p class="headline-3">제목</p>
      <q-input filled
               v-model="title"
               label="제목"/>

      <p class="headline-3">내용</p>
      <q-input filled
               type="textarea"
               v-model="content"
               label="내용"/>

      <div>
        <q-btn flat
               class="mint-file-input"
               icon="add"
               label="파일 첨부"
               @click="triggerFileInput"
        />
        <q-file multiple
                ref="fileInput"
                standout="bg-teal text-white"
                style="display: none"
                v-model="files"
                label="파일 첨부">
          <template v-slot:prepend>
            <q-icon name="add"/>
          </template>
        </q-file>
        <p class="caption-1">
          첨부 파일은 최대 3개, 25MB까지 등록할 수 있어요
        </p>
      </div>

      <section>
        <div v-for="(item, index) in files" class="flex-sb file-list-item">
          <p class="lable-2">{{ item.name }}</p>
          <div class="file-size-and-del">
            <p class="lable-2">{{ formatFileSize(item.size) }}</p>
            <q-icon
              size="24px"
              @click="deleteFile(index)"
              name="remove_circle_outline"/>
          </div>
        </div>
      </section>

      <!-- 다음 버튼 -->
      <q-btn
        rounded flat
        class="primary-btn full-width"
        label="다음"
        @click="save"
      ></q-btn>

      <icon-alart
        :alert-show="checkVal"
        iconName="check_circle"
        :description="checkDescription"
        @confirm="closeModal"
      ></icon-alart>
    </section>
  </div>
</template>

<style scoped>
.nomal-page-layout {
  gap: 1.25rem;
}

.mint-file-input {
  background: #DDF9E5;
}

.file-list-item {
  height: 2.5rem;
}

.file-size-and-del {
  display: flex;
  gap: 0.5rem;
}

.lable-2 {
  color: #4C4C4C;
}
</style>
