<script>
import MyrTextButtonTopBar from "components/app-bar/MyrTextButtonTopBar.vue";

export default {
  name: "MYR_2140",
  components: {MyrTextButtonTopBar},
  props: {
    depart: {
      type: Array,
      default: [],
    },
    range: {
      type: Array,
      default: [],
    },
    performances: {
      type: Array,
      default: [],
    },
    filed: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      groupCount: 1,
      companyName: [],
      departmentName: [],
      yourJob: [],
      performance: [],
      start: [],
      end: [],
    }
  },
  mounted() {
    if (this.range[0]) {
      this.groupCount = this.range.length;

      this.depart.forEach(item => {
        this.companyName.push(item.companyName);
        this.departmentName.push(item.departmentName);
      });
      this.range.forEach(item => {
        this.start.push(item.start);
        this.end.push(item.end);
      });
      this.yourJob = this.filed;
      this.performance = this.performances;
    }
  },
  methods: {
    addGroup() {
      this.groupCount = this.groupCount + 1;
    },
    saveHistory() {
      this.$emit('saveHistory', this.companyName, this.departmentName, this.yourJob, this.performance, this.start, this.end);
    },
    closeModal(closePath) {
      this.$emit('closeModal', closePath);
    }
  },
  computed: {
    doneInput() {
      return (
        this.groupCount === this.companyName.length &&
        this.groupCount === this.departmentName.length &&
        this.groupCount === this.yourJob.length &&
        this.groupCount === this.start.length &&
        this.groupCount === this.performance.length &&
        this.groupCount === this.end.length
      )
    }
  }
}
</script>

<template>
  <div class="myr-page">
    <myr-text-button-top-bar back-path="myr2140" title-text="이력서 작성" @closeModal="closeModal"/>
    <section class="sub-myr-view">
      <div class="full-width">
        <h2 class="headline-2">경력 사항</h2>
        <p class="footnote">최근 연도 순으로 기간과 관련 업무 경력을 입력하세요.</p>
      </div>

      <div v-for="index in groupCount" class="input-group full-width">
        <p class="sub-title-1">경력 {{ index }}</p>
        <div class="input-group-inner-wrap">
          <q-input v-model="companyName[index - 1]" class="full-width" label="회사 또는 단체명"/>
          <q-input v-model="departmentName[index - 1]" class="full-width" label="소속 부서"/>
          <q-input v-model="yourJob[index - 1]" class="full-width" label="주요 담당 업무"/>
          <q-input v-model="performance[index - 1]" class="full-width" label="주요 성과"/>
          <div class="flex-sb full-width" style="gap: 10px">
            <q-input v-model="start[index - 1]" class="full-width" label="시작일" type="date"/>
            <p> - </p>
            <q-input v-model="end[index - 1]" class="full-width" label="종료일" type="date"/>
          </div>
        </div>
      </div>
      <q-btn flat label="경력 추가하기" @click="addGroup"></q-btn>

      <q-btn
        :disable="!doneInput"
        class="full-width myr-modal-save-button"
        flat
        label="저장"
        rounded
        size="lg"
        @click="saveHistory"
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
