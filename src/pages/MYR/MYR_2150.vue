<script>
import MyrTextButtonTopBar from "components/app-bar/MyrTextButtonTopBar.vue";

export default {
  name: "MYR_21450",
  components: {MyrTextButtonTopBar},
  props: {
    savedSchoolName: {
      type: Array,
      default: [],
    },
    savedSchoolRange: {
      type: Array,
      default: [],
    },
    savedSchoolMajors: {
      type: Array,
      default: [],
    },
    savedLanguageNames: {
      type: Array,
      default: [],
    },
    savedLaugageRLevel: {
      type: Array,
      default: [],
    },
    savedLaguageWLevel: {
      type: Array,
      default: [],
    },
    savedLangeageLLevels: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      schoolGroupCount: 1,
      schoolNames: [],
      schoolRangesStart: [],
      schoolRangesEnd: [],
      schoolMajors: [],

      languageGroupCount: 1,
      languageNames: [],
      languageReadingLevels: [],
      languageWriteLevels: [],
      languageLeadingLevels: [],
    }
  },
  created() {
    if (this.savedSchoolName.length) {
      this.schoolGroupCount = this.savedSchoolName.length;

      this.schoolNames = this.savedSchoolName;
      this.savedSchoolRange.forEach(item => {
        this.schoolRangesStart.push(item.start);
        this.schoolRangesEnd.push(item.end);
      });
      this.schoolMajors = this.savedSchoolMajors;
    }

    if (this.savedLanguageNames.length) {
      this.languageGroupCount = this.savedLanguageNames.length;

      this.languageNames = this.savedLanguageNames;
      this.languageReadingLevels = this.savedLaugageRLevel;
      this.languageLeadingLevels = this.savedLangeageLLevels;
      this.languageWriteLevels = this.savedLaguageWLevel;
    }
  },
  methods: {
    addLanguageGroup() {
      this.languageGroupCount = this.languageGroupCount + 1;
    },
    addSchoolGroup() {
      this.schoolGroupCount = this.schoolGroupCount + 1;
    },
    saveSchoolAndLang() {
      this.$emit(
        'saveSchoolAndLang',
        this.schoolNames,
        this.schoolRangesStart,
        this.schoolRangesEnd,
        this.schoolMajors,
        this.languageNames,
        this.languageReadingLevels,
        this.languageWriteLevels,
        this.languageLeadingLevels,
      )
    },
    closeModal(closePath) {
      this.$emit('closeModal', closePath);
    }
  },
  computed: {
    doneInput() {
      const checkValue = (this.schoolGroupCount === this.schoolNames.length &&
        this.schoolGroupCount === this.schoolMajors.length &&
        this.schoolGroupCount === this.schoolRangesStart.length &&
        this.schoolGroupCount === this.schoolRangesEnd.length)

      return checkValue;
    }
  }
}
</script>

<template>
  <div class="myr-page">
    <myr-text-button-top-bar title-text="이력서 작성" back-path="myr2150" @closeModal="closeModal"/>
    <section class="sub-myr-view">
      <!-- 학력 사항 -->
      <div class="full-width">
        <h2 class="headline-2">학력 사항</h2>
        <p class="footnote">최종 학력 기준으로 입력하세요.</p>
      </div>
      <div v-for="(item, index) in schoolGroupCount" class="input-group full-width">
        <p class="sub-title-1">학력 {{ index + 1 }}</p>
        <div class="input-group-inner-wrap">
          <q-input v-model="schoolNames[index]" label="학교명" class="full-width"/>
          <q-input v-model="schoolMajors[index]" label="전공" class="full-width"/>
          <div class="flex-sb full-width" style="gap: 10px">
            <q-input v-model="schoolRangesStart[index]" label="재학 기간" type="date" class="full-width"/>
            <p> - </p>
            <q-input v-model="schoolRangesEnd[index]" label="" type="date" class="full-width"/>
          </div>
        </div>
      </div>
      <q-btn flat label="학력 추가하기" @click="addSchoolGroup"></q-btn>

      <!-- 외국어 *선택사항 -->
      <div class="full-width">
        <h2 class="headline-2">외국어</h2>
        <p class="footnote">최종 학력 기준으로 입력하세요.</p>
      </div>
      <div v-for="(item, index) in languageGroupCount" class="input-group full-width">
        <p class="sub-title-1">외국어 {{ index + 1 }}</p>
        <div class="input-group-inner-wrap">
          <q-input v-model="languageNames[index]" label="외국어 종류" class="full-width"/>
          <div>
            <p class="caption-3">활용 수준 : 듣기</p>
            <q-radio v-model="languageLeadingLevels[index]" val="상" label="상" color="teal" />
            <q-radio v-model="languageLeadingLevels[index]" val="중" label="중" color="teal" />
            <q-radio v-model="languageLeadingLevels[index]" val="하" label="하" color="teal" />
            <p class="caption-3">활용 수준 : 읽기</p>
            <q-radio v-model="languageReadingLevels[index]" val="상" label="상" color="teal" />
            <q-radio v-model="languageReadingLevels[index]" val="중" label="중" color="teal" />
            <q-radio v-model="languageReadingLevels[index]" val="하" label="하" color="teal" />
            <p class="caption-3">활용 수준 : 쓰기</p>
            <q-radio v-model="languageWriteLevels[index]" val="상" label="상" color="teal" />
            <q-radio v-model="languageWriteLevels[index]" val="중" label="중" color="teal" />
            <q-radio v-model="languageWriteLevels[index]" val="하" label="하" color="teal" />
          </div>
        </div>
      </div>
      <q-btn flat label="학력 추가하기" @click="addLanguageGroup"></q-btn>

      <q-btn
        rounded
        flat
        size="lg"
        label="저장"
        :disable="!doneInput"
        class="full-width myr-modal-save-button"
        @click="saveSchoolAndLang"
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
  border: 0.5px solid #C6C6C8;
  background: #FFF;
}
</style>
