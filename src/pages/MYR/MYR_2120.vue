<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  name: "CreateMyResume",
  components: {TextButtonTopBar},
  props: {
    goalArea: {
      type: String,
      default: '',
    },
    goalCompany: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      inputGoalArea: '',
      inputGoalCompany: '',
      backgroundList: [
        "건설·건축",
        "공공·복지",
        "구매·자재·물류",
        "교육",
        "금융·보험",
        "기획·전략",
        "디자인",
        "마케팅·홍보·조사",
        "미디어·문화·스포츠",
        "바이오·제약·식품",
        "상품기획·MD",
        "서비스",
        "생산",
        "연구·R&D",
        "영업·판매·무역",
        "운전·운송·배송",
        "의료",
        "인사·노무·HRD",
        "IT개발·데이터",
        "총무·법무·사무",
        "회계·세무·재무",
        "고객상담·TM"
      ],
    }
  },
  mounted() {
    this.inputGoalArea = this.goalArea;
    this.inputGoalCompany = this.goalCompany;
  },
  methods: {
    save() {
      this.$emit('saveGoalSetting', this.inputGoalArea, this.inputGoalCompany);
    },
  },
  computed: {
    localUserKey() {
      return localStorage.getItem('userKey');
    }
  }
}
</script>

<template>
  <div>
    <text-button-top-bar :title-text="'이력서 작성'"></text-button-top-bar>
    <section class="sub-myr-view">
      <q-select
        v-model="inputGoalArea"
        :options="backgroundList"
        label="목표 업종"
        placeholder="목표 업종을 선택하세요."
        behavior="menu"
        style="font-size: 1.125rem"
        class="full-width"
      />
      <q-input
        v-model="inputGoalCompany"
        :options="backgroundList"
        label="목표 기업"
        placeholder="취업을 바라는 목표 기업명을 입력하세요."
        behavior="menu"
        style="font-size: 1.125rem"
        class="full-width"
      />
    </section>
    <q-btn
      dense
      size="lg"
      square
      :disable="inputGoalArea === '' || inputGoalCompany === ''"
      class="full-width bottom-fixed-btn btn-save nomal-text-3"
      style="background-color: var(--ga-red); color: #fff;">
      <span>저장</span>
    </q-btn>
  </div>
</template>

<style>
.nomal-text-3 {
  font-weight: 600 !important;
}

.sub-myr-view {
  display: flex;
  padding: 1.875rem 1rem 3.125rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}
</style>

<style scoped>
.bottom-fixed-btn {
  position: fixed;
  bottom: 0;
}
</style>
