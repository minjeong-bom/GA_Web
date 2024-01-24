<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import MyrTextButtonTopBar from "components/app-bar/MyrTextButtonTopBar.vue";

export default {
  name: "MYR_2160",
  components: {
    MyrTextButtonTopBar,
    TextButtonTopBar
  },
  props: {
    savedLicenseName: {
      type: Array,
      default: [],
    },
    savedLicenseInst: {
      type: Array,
      default: [],
    },
    savedLicenseDate: {
      type: Array,
      default: [],
    },
    savedEduName: {
      type: Array,
      default: [],
    },
    savedEduInst: {
      type: Array,
      default: [],
    },
    savedEduDate: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      licenseGroupCount: 1,
      licenseName: [],
      licenseInst: [],
      licenseDate: [],
      eduGroupCount: 1,
      eduName: [],
      eduInst: [],
      eduDateStart: [],
      eduDateEnd: [],
    }
  },
  mounted() {
    if (this.savedEduName.length === 0 && this.savedLicenseName.length === 0) {
      return
    }
    if (this.savedLicenseName || this.savedEduName) {
      this.licenseGroupCount = this.savedLicenseName.length;
      this.licenseName = this.savedLicenseName;
      this.licenseInst = this.savedLicenseInst;
      this.licenseDate = this.savedLicenseDate;

      this.eduGroupCount = this.savedEduName.length;
      this.eduName = this.savedEduName;
      this.eduInst = this.savedEduInst;
      console.log('this.savedEduDate', this.savedEduDate)
      this.savedEduDate.forEach(item => {
        this.eduDateStart.push(item.start);
        this.eduDateEnd.push(item.end);
      });
    }
  },
  methods: {
    addLicenseGroup() {
      this.licenseGroupCount = this.licenseGroupCount + 1;
    },
    addEduGroup() {
      this.eduGroupCount = this.eduGroupCount + 1;
    },
    save() {
      this.$emit(
        'saveLicenseAndEdu',
        this.licenseName,
        this.licenseInst,
        this.licenseDate,
        this.eduName,
        this.eduInst,
        this.eduDateStart,
        this.eduDateEnd,
      );
    },
    closeModal(closePath) {
      this.$emit('closeModal', closePath);
    }
  },
  computed: {
    doneInput() {
      // 입력한 그룹에 빈 칸만 없으면 저장되도록 처리함
      return (
        this.licenseName.length === this.licenseInst.length &&
        this.licenseName.length === this.licenseDate.length &&
        this.eduName.length === this.eduInst.length &&
        this.eduName.length === this.eduDateStart.length &&
        this.eduName.length === this.eduDateEnd.length
      )
    }
  }
}
</script>

<template>
  <div class="myr-page">
    <myr-text-button-top-bar back-path="myr2160" title-text="이력서 작성" @closeModal="closeModal"/>
    <section class="sub-myr-view">
      <!-- 자격증 *선택사항 -->
      <div class="full-width">
        <h2 class="headline-2">자격 사항 (선택)</h2>
        <p class="footnote">취득한 자격증을 입력해 주세요.</p>
      </div>
      <div v-for="(item, index) in licenseGroupCount"
           class="input-group full-width">
        <p class="sub-title-1">자격 {{ index + 1 }}</p>
        <div class="input-group-inner-wrap">
          <q-input v-model="licenseName[index]" class="full-width" label="자격명"/>
          <q-input v-model="licenseInst[index]" class="full-width" label="발급 기관"/>
          <q-input v-model="licenseDate[index]" class="full-width" label="취득 년도" type="tel"/>
        </div>
      </div>
      <q-btn flat label="자격 추가하기" @click="addLicenseGroup"></q-btn>

      <!-- 외국어 *선택사항 -->
      <div class="full-width">
        <h2 class="headline-2">기타 교육 사항 (선택)</h2>
        <p class="footnote">
          목표 직무에 도움이 되는 교육을 최근순으로 적어주세요.<br>
          기간이 너무 짧은 것은 제외하고, 1개월 이상의 교육 과정을 위주로 적는 것이 좋아요. (최대 2개)
        </p>
      </div>
      <div v-for="(item, index) in eduGroupCount" class="input-group full-width">
        <p class="sub-title-1">교육 {{ index + 1 }}</p>
        <div class="input-group-inner-wrap">
          <q-input v-model="eduName[index]" class="full-width" label="교육명"/>
          <q-input v-model="eduInst[index]" class="full-width" label="교육기관"/>
          <div class="flex-sb full-width" style="gap: 10px">
            <q-input v-model="eduDateStart[index]" class="full-width" label="시작일" type="date"/>
            <p> - </p>
            <q-input v-model="eduDateEnd[index]" class="full-width" label="종료일" type="date"/>
          </div>
        </div>
      </div>
      <q-btn flat label="교육 추가하기" @click="addEduGroup"></q-btn>

      <q-btn
        :disable="!doneInput"
        class="full-width myr-modal-save-button"
        flat
        label="저장"
        rounded
        size="lg"
        @click="save"
      />
    </section>
  </div>
</template>


<style scoped>
.footnote {
  color: #808080;
}

.input-group-inner-wrap {
  display: flex;
  padding: 1.25rem 1rem;
  flex-direction: column;
  gap: 1.875rem;

  border-radius: 0.75rem;
  border: 1px solid #C6C6C8;
  background: #FFF;
}
</style>
