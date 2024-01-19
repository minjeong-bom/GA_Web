<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue"
import MYR_2120 from "pages/MYR/MYR_2120.vue"
import MyrCard from "components/card/MyrCard.vue"
import LineGuage from "components/data-visual/line-guage.vue"
import MyrInfoCard from "components/card/MyrInfoCard.vue"
import MYR_2130 from "pages/MYR/MYR_2130.vue"
import MYR_2140 from "pages/MYR/MYR_2140.vue"
import MYR_2150 from "pages/MYR/MYR_2150.vue"
import MYR_2160 from "pages/MYR/MYR_2160.vue"
import MYR_2170 from "pages/MYR/MYR_2170.vue";

export default {
  name: "CreateMyResume",
  components: {
    MyrInfoCard,
    LineGuage,
    TextButtonTopBar,
    MyrCard,
    MYR_2120,
    MYR_2130,
    MYR_2140,
    MYR_2150,
    MYR_2160,
    MYR_2170
  },
  data() {
    return {
      myrTitle: '',
      userGoal: '이직',
      goalArea: '', // 목표 업종,
      goalCompany: '', // 목표 회사,
      mrpPhoto: '', // 사진,
      resm_profile_image: '', // 사진,
      myHistory: {
        resm_cp_depart: [], // 회사 이름, 소속 부서
        resm_cp_field: [], // 회사 주요 담당 업무
        resm_cp_range: [], // 회사 근무기간
        resm_cp_performance: [], // 회사 성과
      }, // 경력 및 성과,
      mySchool: {
        resm_sc_title: [], // 학력 학교명
        resm_sc_major: [], // 학력 전공
        resm_sc_range: [], // 학력 재학기간
      }, // 학력
      myLanguage: {
        resm_fl_category: [], // 외국어 종류
        resm_fl_write: [], // 외국어 수준 쓰기
        resm_fl_read: [], // 외국어 수준 읽기
        resm_fl_speak: [], // 외국어 수준 말하기
      }, // 외국어
      myLisence: {
        resm_ct_title: [], // 자격증 명
        resm_ct_inst: [], // 자격증 발급기관
        resm_ct_date: [], // 자격증 취득년도
      }, // 자격증
      myEducation: {
        resm_ed_title: [], // 교육 명
        resm_ed_inst: [], // 교육 기관
        resm_ed_range: [], // 교육 기간
      }, // 기타 교육
      married: null,
      familys: Number,
      showModal: {
        scrollLock: false,
        myr2120: false,
        myr2130: false,
        myr2140: false,
        myr2150: false,
        myr2160: false,
        myr2170: false,
      }
    }
  },
  methods: {

    async saveMyResume() {
      try {
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'resm',

            // 이력서
            data_title: this.myrTitle ? this.myrTitle : '제목없는 이력서', // 이력서 제목
            data_mem_key: this.localUserKey, // 작성자 키
            // 목표
            data_type: this.goalCompany, // 목표 기업명
            data_category: this.goalArea, // 목표 분야
            // 프로필
            data_profile_image: this.resm_profile_image, // 이력서 프로필 이미지
            // 경력 사항
            data_cp_depart: JSON.stringify(this.myHistory.resm_cp_depart), // 회사 이름, 소속 부서
            data_cp_field: JSON.stringify(this.myHistory.resm_cp_field), // 회사 주요 담당 업무
            data_cp_range: JSON.stringify(this.myHistory.resm_cp_range), // 회사 근무기간
            data_cp_performance: JSON.stringify(this.myHistory.resm_cp_performance), // 회사 성과
            // 학력
            data_sc_title: JSON.stringify(this.mySchool.resm_sc_title), // 학력 학교명
            data_sc_major: JSON.stringify(this.mySchool.resm_sc_major), // 학력 전공
            data_sc_range: JSON.stringify(this.mySchool.resm_sc_range), // 학력 재학기간
            // 외국어
            data_fl_category: JSON.stringify(this.myLanguage.resm_fl_category), // 외국어 종류
            data_fl_write: JSON.stringify(this.myLanguage.resm_fl_write), // 외국어 수준 쓰기
            data_fl_read: JSON.stringify(this.myLanguage.resm_fl_read), // 외국어 수준 읽기
            data_fl_speak: JSON.stringify(this.myLanguage.resm_fl_speak), // 외국어 수준 말하기
            // 자격증
            data_ct_title: JSON.stringify(this.myLisence.resm_ct_title), // 자격증 명
            data_ct_inst: JSON.stringify(this.myLisence.resm_ct_inst), // 자격증 발급기관
            data_ct_date: JSON.stringify(this.myLisence.resm_ct_date), // 자격증 취득년도
            // 교육
            data_ed_title: JSON.stringify(this.myEducation.resm_ed_title), // 교육 명
            data_ed_inst: JSON.stringify(this.myEducation.resm_ed_inst), // 교육 기관
            data_ed_range: JSON.stringify(this.myEducation.resm_ed_range), // 교육 기간
            // 인적 사항
            data_spouse: this.married, // 배우자 여부
            data_kids: this.familys, // 자녀수
            // 해외 연수
            data_oc_title: '', // 해외 연수 명
            data_oc_country: '', // 해외 연수 국가
            data_oc_inst: '', // 해외 연수 기관
            data_oc_range: '', // 해외 연수 교육 기간
            // 수상 내역
            data_aw_title: '', // 수상 내역 명
            data_aw_inst: '', // 수상 내역 발급 기관
            data_aw_date: '', // 수상 내역 수상연도
            // ???
            data_career_summary: this.userGoal, // 경력 요약
            data_strategy: '' // 핵심 역량
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }
        const result = await this.$api.post(config.url, config.body, config.etc)
        const resumeKey = result.data.response.result.data_key;
        this.createdResumeResult(resumeKey);
      } catch (e) {
        console.error('이력서 등록 실패', e)
      }
    },
    async createdResumeResult(resumeKey) {
      try {
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: "bc",
            data_title: this.localUserKey,
            data_foreign_key: "IUSHLIAS",
            data_foreign_key2: "WPHNTUFK",
            data_content: JSON.stringify({
              resumeTitle: this.myrTitle,
              resumeKey: resumeKey,
              resumePersent: this.donePersent,
            }),
            data_writer_name: this.localUserKey
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }
        const result = await this.$api.post(config.url, config.body, config.etc)
      } catch (e) {
        console.error('목록 등록 실패', e)
      }
    },
    saveGoalSetting(goalArea, goalCompany) {
      this.goalArea = goalArea
      this.goalCompany = goalCompany
      this.closeModal('myr2120')
    },
    async saveProfileImage(key) {
      this.closeModal('myr2130')
      this.resm_profile_image = key
      // 아래는 저장된 이미지 재 조회
      try {
        const config = {
          url: '/api/crud/single/' + key,
          body: {
            "prefix": "bc",
            "alias": "bc",
            "scopes": "bc_content"
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }
        const result = await this.$api.post(config.url, config.body, config.etc)
        console.log(result)
        this.mrpPhoto = result.data.response.view.bc_content
      } catch (e) {
        console.error(e)
      }
    },
    saveHistory(companyName, departmentName, yourJob, performance, start, end) {
      this.closeModal('myr2140')

      if (companyName.length === departmentName.length) {
        this.myHistory.resm_cp_depart = companyName.map((item, index) => {
          return {companyName: item, departmentName: departmentName[index]}
        })
      } else {
        console.error('회사명과 부서의 배열 길이가 다릅니다')
      }

      this.myHistory.resm_cp_field = yourJob
      this.myHistory.resm_cp_performance = performance

      if (start.length === end.length) {
        this.myHistory.resm_cp_range = start.map((start, index) => {
          return {start: start, end: end[index]}
        })
      } else {
        console.error('시작 날짜와 종료 날짜의 배열 길이가 다릅니다.')
      }

      console.log(this.myHistory)
    },
    saveSchoolAndLang(schoolName, schoolRange1, schoolRange2, schoolMagor, languageType, languageRLevel, languageWLevel, languageLLevel) {
      this.mySchool.resm_sc_title = schoolName
      this.mySchool.resm_sc_major = schoolMagor
      if (schoolRange1.length === schoolRange2.length) {
        this.mySchool.resm_sc_range = schoolRange1.map((schoolRange1, index) => {
          return {start: schoolRange1, end: schoolRange2[index]}
        })
      } else {
        console.error('시작 날짜와 종료 날짜의 배열 길이가 다릅니다.')
      }

      this.myLanguage.resm_fl_category = languageType
      this.myLanguage.resm_fl_speak = languageLLevel
      this.myLanguage.resm_fl_read = languageRLevel
      this.myLanguage.resm_fl_write = languageWLevel

      this.closeModal('myr2150')
    },
    saveLicenseAndEdu(licenseName, licenseInst, licenseDate, eduName, eduInst, eduDateStart, eduDateEnd) {
      this.myLisence.resm_ct_title = licenseName
      this.myLisence.resm_ct_inst = licenseInst
      this.myLisence.resm_ct_date = licenseDate
      this.myEducation.resm_ed_title = eduName
      this.myEducation.resm_ed_inst = eduInst
      if (eduDateStart.length === eduDateEnd.length) {
        this.myEducation.resm_ed_range = eduDateStart.map((eduDateStart, index) => {
          return {start: eduDateStart, end: eduDateEnd[index]}
        })
      }

      this.closeModal('myr2160')
    },
    savePersonalInfo(married, familys) {
      this.married = married
      this.familys = familys
      this.closeModal('myr2170')
    },
    navigateTo(path) {
      this.$router.push(path)
    },
    openModal(card) {
      this.showModal.scrollLock = true
      if (card === 'myr2120') {
        this.showModal.myr2120 = true
      }
      if (card === 'myr2130') {
        this.showModal.myr2130 = true
      }
      if (card === 'myr2140') {
        this.showModal.myr2140 = true
      }
      if (card === 'myr2150') {
        this.showModal.myr2150 = true
      }
      if (card === 'myr2160') {
        this.showModal.myr2160 = true
      }
      if (card === 'myr2170') {
        this.showModal.myr2170 = true
      }
    },
    closeModal(card) {
      this.showModal.scrollLock = false

      if (card === 'myr2120') {
        this.showModal.myr2120 = false
      }
      if (card === 'myr2130') {
        this.showModal.myr2130 = false
      }
      if (card === 'myr2140') {
        this.showModal.myr2140 = false
      }
      if (card === 'myr2150') {
        this.showModal.myr2150 = false
      }
      if (card === 'myr2160') {
        this.showModal.myr2160 = false
      }
      if (card === 'myr2170') {
        this.showModal.myr2170 = false
      }
    }
  },
  computed: {
    localUserKey() {
      return localStorage.getItem('userKey')
    },
    donePersent() {
      let value = 0

      value += this.goalArea ? 16 : 0
      value += this.resm_profile_image ? 20 : 0
      value += this.myHistory.resm_cp_depart.length > 0 ? 16 : 0
      value += this.mySchool.resm_sc_title.length > 0 ? 16 : 0
      value += this.myLanguage.resm_fl_category.length > 0 ? 16 : 0
      value += this.married ? 16 : 0

      return value
    },
    goalResult() {
      const arraySet = [
        {
          name: '목표 분야',
          result: this.goalArea
        },
        {
          name: '목표 기업',
          result: this.goalCompany
        }
      ]

      return arraySet
    },
    myHistoryResult() {
      let arraySet = [];

      const target = this.myHistory;
      for (let i = 0; i < this.myHistory.resm_cp_range.length; i++) {
        arraySet.push({
          name: '경력' + (i + 1),
          result: [
            target.resm_cp_depart[i].companyName,
            target.resm_cp_depart[i].departmentName,
            target.resm_cp_field[i],
            target.resm_cp_performance[i],
            target.resm_cp_range[i].start + ' ~ ' + this.myHistory.resm_cp_range[i].end
          ],
        })
      }

      return arraySet
    },
    mySchoolAndLangResult() {
      let arraySet = [];

      const target = this.mySchool;
      for (let i = 0; i < this.mySchool.resm_sc_title.length; i++) {
        arraySet.push({
          name: '학력' + (i + 1),
          result: [
            target.resm_sc_title[i] + ', ' + target.resm_sc_major[i],
            target.resm_sc_range[i].start + ' ~ ' + target.resm_sc_range[i].end
          ],
        })
      }

      const target2 = this.myLanguage;
      for (let i = 0; i < this.myLanguage.resm_fl_category.length; i++) {
        arraySet.push({
          name: '외국어' + (i + 1),
          result: [
            target2.resm_fl_category[i],
            ''
          ],
        })
      }

      return arraySet
    },
    myEducationAndLicenseResult() {
      let arraySet = [];

      const target = this.myLisence;
      for (let i = 0; i < this.myLisence.resm_ct_title.length; i++) {
        arraySet.push({
          name: '자격증' + (i + 1),
          result: [
            target.resm_ct_title[i] + ', ' + target.resm_ct_date[i]
          ],
        })
      }

      const target2 = this.myEducation;
      for (let i = 0; i < this.myEducation.resm_ed_title.length; i++) {
        arraySet.push({
          name: '교육' + (i + 1),
          result: [
            target2.resm_ed_title[i] + ', ' + target2.resm_ed_inst[i]
          ],
        })
      }

      return arraySet
    },
    personalInfoResult() {
      const arraySet = [
        {
          name: '결혼 구분',
          result: this.married
        },
        {
          name: '자녀수',
          result: this.familys
        }
      ]

      return arraySet
    },
  }
}
</script>

<template>
  <div class="myr-page">
    <text-button-top-bar :button-name="'저장'" :title-text="'이력서 작성'" @action="saveMyResume"></text-button-top-bar>

    <div :class="{ 'background-scroll-rock' : showModal.scrollLock }">
      <section class="section-md">
        <q-input
          v-model="myrTitle"
          class="full-width"
          hint="제출할 기업/기관 등으로 구분해 보세요. 예) ㅇㅇ기업용, ㅇㅇ업무용"
          label="이력서명"></q-input>
      </section>

      <section class="section-s">
        <h3 class="headline-3">이직 또는 전직 여부
          <q-icon name="info"></q-icon>
        </h3>
        <div class="flex-sb">
          <q-radio v-model="userGoal" label="이직" val="이직"/>
          <q-radio v-model="userGoal" label="전직" val="전직"/>
        </div>
      </section>

      <section class="section-s">
        <h3 class="headline-3">이력서 작성 완성도</h3>
        <line-guage :value="donePersent"></line-guage>
      </section>

      <section class="section-l">
        <!-- 목표 분야 및 기업 -->
        <myr-card
          v-if="!goalArea || !goalCompany"
          :card-description="'기업마다 요구하는 역량이나 우대사항은 모두 달라요. 기업은 요구사항에 맞는 적합한 인재를 원하죠. 그래서 목표에 맞게 준비를 해야해요.'"
          :card-head-line="'목표 분야 및 기업'"
          :card-thumb-name-imgae-name="'myr-card-thumb-1'"
          :card-title="'목표를 세우는 것이 가장 중요해요'"
          @click="openModal('myr2120')"
          @saveGoalSetting="saveGoalSetting"
        />
        <myr-info-card v-else :card-head-line="'목표 분야 및 기업'" :results="goalResult" @click="openModal('myr2120')"/>
        <!-- 프로필 사진 -->
        <myr-card
          :card-caption="'(사람인 이력서 사진 평가 조사 결과)'"
          :card-description="'기업의 62.6%가 이력서 사진 때문에 서류전형에서 지원자를 탈락시킨 경험이 있다고해요.'"
          :card-head-line="'프로필 사진'"
          :card-thumb-name-imgae-name="'myr-card-thumb-2-1'"
          :card-title="'돋보이는 사진은 이력서를 각인시키는 효과가 있어요'"
          :uploadPhoto="mrpPhoto"
          @click="openModal('myr2130')"
        />
        <!-- 경령 및 성과 -->
        <myr-card
          v-if="!this.myHistory.resm_cp_field.length"
          :card-caption="'(1000대 기업 서류 전형 기준표 기준)'"
          :card-description="'경력사항의 배점은 약 10%를 차지해요. 유사업무 경력이 2개 이상일 때 좋은 점수를 받을 수 있어요.'"
          :card-head-line="'경력 및 성과'"
          :card-thumb-name-imgae-name="'myr-card-thumb-2'"
          :card-title="'목표하는 기업에 맞는 경력과 성과를 작성하세요.'"
          @click="openModal('myr2140')"
        />
        <myr-info-card v-else :card-head-line="'경력 및 성과'" :item-length="5" :results="myHistoryResult"
                       @click="openModal('myr2140')"/>
        <!-- 학력 및 외국어 -->
        <myr-card
          v-if="!this.mySchool.resm_sc_title.length"
          :card-caption="'(1000대 기업 서류 전형 기준표 기준)'"
          :card-description="'학력과 어학의 배점은 각 45%, 10% 정도의 비중을 차지해요. 전공 관련성과 학점이 약 20%를 차지하고, 대학원의 경우 가점이 있어요.'"
          :card-head-line="'학력 및 외국어'"
          :card-thumb-name-imgae-name="'myr-card-thumb-4'"
          :card-title="'최종 학력과 관련 전공을 중심으로 작성하는 것이 좋아요. 업무에 직접적 연관이 있는 외국어는 우대해줘요'"
          @click="openModal('myr2150')"
        />
        <p v-else>
          {{ mySchoolAndLangResult }}
        </p>
        <myr-info-card v-else :card-head-line="'학력 및 외국어'" :item-length="2" :results="mySchoolAndLangResult"
                       @click="openModal('myr2140')"/>
        <!-- 자격 및 기타 교육 -->
        <myr-card
          v-if="!this.myLisence.resm_ct_title.length && !this.myEducation.resm_ed_title.length"
          :card-caption="'(1000대 기업 서류 전형 기준표 기준)'"
          :card-description="'자격의 배점은 약 10% 정도의 비중을 차지해요. 기타 교육 사항은 약 5%의 추가 점수를 받을 수 있어요.'"
          :card-head-line="'자격 및 기타 교육'"
          :card-thumb-name-imgae-name="'myr-card-thumb-5'"
          :card-title="'기업이 요구하는 역량과 관련된 자격 및 교육 사항은 신뢰를 더해줄 수 있어요'"
          @click="openModal('myr2160')"
        />
        <myr-info-card v-else :card-head-line="'자격 및 기타 교육'" :item-length="2" :results="myEducationAndLicenseResult"
                       @click="openModal('myr2160')"/>
        <!-- 인적 사항 -->
        <myr-card
          v-if="!this.married"
          :card-description="'가족 관계 확인을 위해 필요해요.'"
          :card-head-line="'인적 사항'"
          :card-thumb-name-imgae-name="'myr-card-thumb-6'"
          :card-title="'인적 사항은 서류 전형 필수 정보에요'"
          @click="openModal('myr2170')"
        />
        <myr-info-card v-else :card-head-line="'인적 사항'" :results="personalInfoResult" @click="openModal('myr2170')"/>
      </section>
    </div>

    <!-- 하위 컴포넌트 -->
    <MYR_2120
      v-if="showModal.myr2120"
      :goal-area="goalArea"
      :goal-company="goalCompany"
      class="popup-modal"
      @closeModal="closeModal"
      @saveGoalSetting="saveGoalSetting"
    />
    <MYR_2130
      v-if="showModal.myr2130"
      :profile-image="mrpPhoto"
      class="popup-modal"
      @closeModal="closeModal"
      @saveProfileImage="saveProfileImage"
    />
    <MYR_2140
      v-if="showModal.myr2140"
      :depart="myHistory.resm_cp_depart"
      :filed="myHistory.resm_cp_field"
      :performances="myHistory.resm_cp_performance"
      :range="myHistory.resm_cp_range"
      class="popup-modal"
      @closeModal="closeModal"
      @saveHistory="saveHistory"
    />
    <MYR_2150
      v-if="showModal.myr2150"
      :saved-laguage-w-level="myLanguage.resm_fl_write"
      :saved-langeage-l-levels="myLanguage.resm_fl_speak"
      :saved-language-names="myLanguage.resm_fl_category"
      :saved-laugage-r-level="myLanguage.resm_fl_read"
      :saved-school-majors="mySchool.resm_sc_major"
      :saved-school-name="mySchool.resm_sc_title"
      :saved-school-range="mySchool.resm_sc_range"
      class="popup-modal"
      @closeModal="closeModal"
      @saveSchoolAndLang="saveSchoolAndLang"
    />
    <MYR_2160
      v-if="showModal.myr2160"
      :saved-edu-date="myEducation.resm_ed_range"
      :saved-edu-inst="myEducation.resm_ed_inst"
      :saved-edu-name="myEducation.resm_ed_title"
      :saved-license-date="myLisence.resm_ct_date"
      :saved-license-inst="myLisence.resm_ct_inst"
      :saved-license-name="myLisence.resm_ct_title"
      class="popup-modal"
      @closeModal="closeModal"
      @saveLicenseAndEdu="saveLicenseAndEdu"
    />
    <MYR_2170
      v-if="showModal.myr2170"
      class="popup-modal"
      @closeModal="closeModal"
      @savePersonalInfo="savePersonalInfo"
    />
  </div>
</template>

<style scoped>
.background-scroll-rock {
  height: 0;
  overflow: hidden;
}

.section-md {
  display: flex;
  width: 100%;
  padding: 20px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

.section-s {
  display: flex;
  width: 100%;
  padding: 10px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.section-l {
  display: flex;
  padding: 25px 24px 30px 24px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.popup-modal {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>
