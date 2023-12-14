<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  name: "CreateMyResume",
  components: {
    TextButtonTopBar
  },
  data() {
    return {
      myrTitle: '',
      userGoal: '이직',
      goalArea: '', // 목표 업종,
      goalCompany: '', // 목표 회사,
      mrpPhoto: '', // 사진,
      myHistory: {
        resm_cp_depart : [], // 회사 소속 부서
        resm_cp_field : [], // 회사 주요 담당 업무
        resm_cp_range : [], // 회사 근무기간
        resm_cp_performance : [], // 회사 성과
      }, // 경력 및 성과,
      myShool: {
        resm_sc_title : [], // 학력 학교명
        resm_sc_major : [], // 학력 전공
        resm_sc_range : [], // 학력 재학기간
      }, // 학력
      myLanguage: {
        resm_fl_category : [], // 외국어 종류
        resm_fl_write : [], // 외국어 수준 쓰기
        resm_fl_read : [], // 외국어 수준 읽기
        resm_fl_speak : [], // 외국어 수준 말하기
      }, // 외국어
      myLisence: {
        resm_ct_title : [], // 자격증 명
        resm_ct_inst : [], // 자격증 발급기관
        resm_ct_date : [], // 자격증 취득년도
      }, // 자격증
      myEducation: {
        resm_ed_title : [], // 교육 명
        resm_ed_inst : [], // 교육 기관
        resm_ed_range : [], // 교육 기간
      }, // 기타 교육
      married: Boolean,
      familys: Number,
    }
  },
  methods: {
    async saveMyResume() {
      try {
        const config = {
          url: '/api/crud/create',
          body: {
            // 이력서
            resm_title: this.myrTitle ? this.myrTitle : '제목없는 이력서', // 이력서 제목
            resm_mem_key: this.localUserKey, // 작성자 키
            // 목표
            data_prefix: 'resm',
            resm_type: this.goalCompany, // 목표 기업명
            resm_category : this.goalArea, // 목표 분야
            // 프로필
            resm_profile_image : '', // 이력서 프로필 이미지
            // 경력 사항
            resm_cp_depart : this.myHistory.resm_cp_depart, // 회사 소속 부서
            resm_cp_field :  this.myHistory.resm_cp_field, // 회사 주요 담당 업무
            resm_cp_range :  this.myHistory.resm_cp_range, // 회사 근무기간
            resm_cp_performance :  this.myHistory.resm_cp_performance, // 회사 성과
            // 학력
            resm_sc_title : this.myShool.resm_sc_title, // 학력 학교명
            resm_sc_major : this.myShool.resm_sc_major, // 학력 전공
            resm_sc_range : this.myShool.resm_sc_range, // 학력 재학기간
            // 외국어
            resm_fl_category : this.myLanguage.resm_fl_category, // 외국어 종류
            resm_fl_write : this.myLanguage.resm_fl_write, // 외국어 수준 쓰기
            resm_fl_read : this.myLanguage.resm_fl_read, // 외국어 수준 읽기
            resm_fl_speak : this.myLanguage.resm_fl_speak, // 외국어 수준 말하기
            // 자격증
            resm_ct_title : this.myLisence.resm_ct_title, // 자격증 명
            resm_ct_inst : this.myLisence.resm_ct_inst, // 자격증 발급기관
            resm_ct_date : this.myLisence.resm_ct_date, // 자격증 취득년도
            // 교육
            resm_ed_title : this.myEducation.resm_ed_title, // 교육 명
            resm_ed_inst : this.myEducation.resm_ed_inst, // 교육 기관
            resm_ed_range : this.myEducation.resm_ed_range, // 교육 기간
            // 인적 사항
            resm_spouse : this.married, // 배우자 여부
            resm_kids : this.familys, // 자녀수
            // 해외 연수
            resm_oc_title : '', // 해외 연수 명
            resm_oc_country : '', // 해외 연수 국가
            resm_oc_inst : '', // 해외 연수 기관
            resm_oc_range : '', // 해외 연수 교육 기간
            // 수상 내역
            resm_aw_title : '', // 수상 내역 명
            resm_aw_inst : '', // 수상 내역 발급 기관
            resm_aw_date : '', // 수상 내역 수상연도
            // ???
            resm_career_summary : '', // 경력 요약
            resm_strategy : '' // 핵심 역량
          },
          etc: {
            headers: {
              'SPRINT-API-KEY' : 'sprinttest',
            }
          }
        }
        const result = this.$api.post(config.url, config.body, config.etc);
      } catch (e) {
        console.error(e);
      }
    },
    navigateTo(path) {
      this.$router.push(path);
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
    <text-button-top-bar :title-text="'이력서 작성'" :button-name="'저장'" @action="saveMyResume"></text-button-top-bar>

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
        <q-radio v-model="userGoal" val="이직" label="이직"/>
        <q-radio v-model="userGoal" val="전직" label="전직"/>
      </div>
    </section>

    <section class="section-s">
      <h3 class="headline-3">이력서 작성 완성도</h3>
      <div class="flex-sb full-width">
        <div class="persent"></div>
        <span class="guage-value">16<span class="unit">%</span></span>
        <span class="guage-value">33<span class="unit">%</span></span>
        <span class="guage-value">50<span class="unit">%</span></span>
        <span class="guage-value">66<span class="unit">%</span></span>
        <span class="guage-value">83<span class="unit">%</span></span>
        <span class="guage-value">100<span class="unit">%</span></span>
      </div>
      <div class="quage-wrap">
        <div class="quage-fill"></div>
      </div>
    </section>

    <section class="section-l">
      <!-- 목표 분야 및 기업 -->
      <div class="input-card-wrap">
        <div class="flex-sb full-width">
          <h3 class="headline-3">목표 분야 및 기업</h3>
          <q-btn
            dense
            flat
            round
            icon="add"
            style="color: var(--labels-secondary)"
            @click="navigateTo('/myr2120')"
          />
        </div>
        <div class="input-card">
          <img src="../../assets/graphic/myr-card-thumb-1.png"/>
          <div>
            <p class="input-card-title sub-title-1">
              목표를 세우는 것이 가장 중요해요
            </p>
            <p class="input-card-body">
              기업마다 요구하는 역량이나 우대사항은 모두 달라요. 기업은 요구사항에 맞는 적합한 인재를 원하죠. 그래서 목표에 맞게 준비를 해야해요.
            </p>
          </div>
        </div>
      </div>
      <!-- 프로필 사진 -->
      <div class="input-card-wrap">
        <div class="flex-sb full-width">
          <h3 class="headline-3">프로필 사진</h3>
          <q-btn
            dense
            flat
            round
            icon="add"
            style="color: var(--labels-secondary)"/>
        </div>
        <div class="input-card">
          <img src="../../assets/graphic/myr-card-thumb-2.png"/>
          <div>
            <p class="input-card-title sub-title-1">
              돋보이는 사진은 이력서를 각인시키는 효과가 있어요
            </p>
            <p class="input-card-body">
              기업의 62.6%가 이력서 사진 때문에 서류전형에서 지원자를 탈락시킨 경험이 있다고해요.
              <span class="caption-3">(사람인 이력서 사진 평가 조사 결과)</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 경령 및 성과 -->
      <div class="input-card-wrap">
        <div class="flex-sb full-width">
          <h3 class="headline-3">목표하는 기업에 맞는 경력과 성과를 작성하세요.</h3>
          <q-btn
            dense
            flat
            round
            icon="add"
            style="color: var(--labels-secondary)"/>
        </div>
        <div class="input-card">
          <img src="../../assets/graphic/myr-card-thumb-2-1.png"/>
          <div>
            <p class="input-card-title sub-title-1">
              목표하는 기업에 맞는 경력과 성과를 작성하세요
            </p>
            <p class="input-card-body">
              경력사항의 배점은 약 10%를 차지해요. 유사업무 경력이 2개 이상일 때 좋은 점수를 받을 수 있어요. <span
              class="caption-3">(1000대 기업 서류 전형 기준표 기준)</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 학력 및 외국어 -->
      <div class="input-card-wrap">
        <div class="flex-sb full-width">
          <h3 class="headline-3">학력 및 외국어</h3>
          <q-btn
            dense
            flat
            round
            icon="add"
            style="color: var(--labels-secondary)"/>
        </div>
        <div class="input-card">
          <img src="../../assets/graphic/myr-card-thumb-4.png"/>
          <div>
            <p class="input-card-title sub-title-1">
              최종 학력과 관련 전공을 중심으로 작성하는 것이 좋아요. 업무에 직접적 연관이 있는 외국어는 우대해줘요
            </p>
            <p class="input-card-body">
              학력과 어학의 배점은 각 45%, 10% 정도의 비중을 차지해요. 전공 관련성과 학점이 약 20%를 차지하고, 대학원의 경우 가점이 있어요.
              <span class="caption-3">
                (1000대 기업 서류 전형 기준표 기준)
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- 자격 및 기타 교육 -->
      <div class="input-card-wrap">
        <div class="flex-sb full-width">
          <h3 class="headline-3">자격 및 기타 교육</h3>
          <q-btn dense flat icon="add" round style="color: var(--labels-secondary)"></q-btn>
        </div>
        <div class="input-card">
          <img src="../../assets/graphic/myr-card-thumb-5.png"/>
          <div>
            <p class="input-card-title sub-title-1">
              기업이 요구하는 역량과 관련된 자격 및 교육 사항은 신뢰를 더해줄 수 있어요
            </p>
            <p class="input-card-body">
              자격의 배점은 약 10% 정도의 비중을 차지해요. 기타 교육 사항은 약 5%의 추가 점수를 받을 수 있어요.
              <span class="caption-3">
                (1000대 기업 서류 전형 기준표 기준)
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- 인적 사항 -->
      <div class="input-card-wrap">
        <div class="flex-sb full-width">
          <h3 class="headline-3">인적 사항</h3>
          <q-btn
            dense
            flat
            round
            icon="add"
            style="color: var(--labels-secondary)"/>
        </div>
        <div class="input-card">
          <img src="../../assets/graphic/myr-card-thumb-6.png"/>
          <div>
            <p class="input-card-title sub-title-1">
              인적 사항은 서류 전형 필수 정보에요
            </p>
            <p class="input-card-body">
              가족 관계 확인을 위해 필요해요.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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

.input-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  align-self: stretch;
}

.headline-3 {
  display: flex;
  align-items: center;
  gap: 5px;

  color: var(--labels-secondary);

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.4px;
}

.input-card {
  padding: 12px;
  border: 1px solid #CDCDCD;
  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 0.625rem;
  border: 1px solid #CDCDCD;
}

.input-card-title {
  margin-bottom: 0.31rem;
}

.quage-wrap {
  width: 100%;
  height: 16px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(120, 120, 128, 0.16);
}

.guage-value {
  color: var(--grays-black);
  text-align: right;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.4px;
}

.guage-value .unit {
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 161.538% */
  letter-spacing: -0.4px;
}

.quage-fill {
  width: 16%;
  height: 100%;
  background-color: var(--ga-red);
}

.input-card-wrap {
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 1.21875rem */
  letter-spacing: -0.01875rem;
}

.input-card img {
  width: 4.75rem;
  height: 4.75rem;
}
</style>
