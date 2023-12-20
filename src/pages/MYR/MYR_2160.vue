<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  name: "MYR_2160",
  components: {
    TextButtonTopBar
  },
  props: {
    savedLicenseName : {
      type: Array,
      default: [],
    },
    savedLicenseInst : {
      type: Array,
      default: [],
    },
    savedLicenseDate : {
      type: Array,
      default: [],
    },
    savedEduName : {
      type: Array,
      default: [],
    },
    savedEduInst : {
      type: Array,
      default: [],
    },
    savedEduDate : {
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
    if (this.savedLicenseName) {
      this.licenseName = this.savedLicenseName;
      this.licenseInst = this.savedLicenseInst;
      this.licenseDate = this.savedLicenseDate;

      this.eduName = this.savedEduName;
      this.eduInst = this.savedEduInst;
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
  },
  computed: {
    doneInput() {
      // 입력한 그룹에 빈 칸만 없으면 저장되도록 처리함
      const checkVal = (
        this.licenseName.length === this.licenseInst.length &&
        this.licenseName.length === this.licenseDate.length &&
        this.eduName.length === this.eduInst.length &&
        this.eduName.length === this.eduDateStart.length &&
        this.eduName.length === this.eduDateEnd.length
      )
      return checkVal
    }
  }
}
</script>

<template>
  <div class="myr-page">
    <text-button-top-bar :title-text="'자격 및 기타 교육'"></text-button-top-bar>
    <section class="sub-myr-view">
      <!-- 자격증 *선택사항 -->
      <div class="full-width">
        <h2 class="headline-2">자격 사항 (선택)</h2>
        <p class="footnote">취득한 자격증을 입력해 주세요.</p>
      </div>
      <div v-for="(item, index) in licenseGroupCount" class="input-group full-width">
        <p class="sub-title-1">자격 {{ index + 1 }}</p>
        <div class="input-group-inner-wrap">
          <q-input v-model="licenseName[index]" label="자격명" class="full-width"/>
          <q-input v-model="licenseInst[index]" label="발급 기관" class="full-width"/>
          <q-input v-model="licenseDate[index]" type="tel" label="취득 년도" class="full-width"/>
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
          <q-input v-model="eduName[index]" label="교육명" class="full-width"/>
          <q-input v-model="eduInst[index]" label="교육기관" class="full-width"/>
          <div class="flex-sb full-width" style="gap: 10px">
            <q-input v-model="eduDateStart[index]" label="시작일" type="date" class="full-width"/>
            <p> - </p>
            <q-input v-model="eduDateEnd[index]" label="종료일" type="date" class="full-width"/>
          </div>
        </div>
      </div>
      <q-btn flat label="교육 추가하기" @click="addEduGroup"></q-btn>

      <q-btn
        rounded
        flat
        size="lg"
        label="저장"
        :disable="!doneInput"
        class="full-width myr-modal-save-button"
        @click="save"
      />
    </section>
  </div>
</template>


<style scoped>
.footnote {
  color: #808080;
}

.bottom-fixed-btn {
  position: fixed;
  bottom: 0;
}

.input-group-inner-wrap {
  display: flex;
  padding: 1.25rem 1rem;
  flex-direction: column;
  gap: 1.875rem;

  border-radius: 0.75rem;
  border: 0.5px solid #C6C6C8;
  background: #FFF;
}
</style>
