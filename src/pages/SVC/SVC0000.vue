<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  components: {TextButtonTopBar, TitleTopBar},
  data() {
    return {
      sectionNumber: 1,
      options: [
        {
          label: '오류 및 속도 느림',
          value: '오류 및 속도 느림',
        },
        {
          label: '제공 정보',
          value: '제공 정보',
        },
        {
          label: '검색 및 탐색 과정',
          value: '검색 및 탐색 과정',
        },
        {
          label: '커뮤니티 운영',
          value: '커뮤니티 운영',
        },
        {
          label: '서비스 제안',
          value: '서비스 제안',
        },
        {
          label: '기타 의견',
          value: '기타 의견',
        },
      ],
      vocType: [],
      serviceScore: '5',
      serviceComment: '',
      isLoading: false,
    }
  },
  methods: {
    next() {
      if (this.sectionNumber < 3) {
        this.sectionNumber += 1;
      } else if (this.sectionNumber === 3) {
        if (this.vocType.length === 0) {
          this.$q.notify('한 가지 이상 선택해 주세요');
        } else {
          this.createNewVOC();
        }
      } else {
        this.$router.push('/');
      }
    },
    async createNewVOC() {
      try {
        this.isLoading = true;
        let contentData;
        contentData = {
          serviceScore: this.serviceScore,
          serviceComment: this.serviceComment,
          vocType: this.vocType,
        };
        const config = {
          url: '/api/crud/create',
          body: {
            data_prefix: 'bc',
            data_title: this.storageUserKey,
            data_foreign_key: 'ZKFCJZTW', // 카테고리 키
            data_foreign_key2: 'ZRBTGTEX', // 게시판 키
            data_content: JSON.stringify(contentData),
            data_writer_name: this.storageUserKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          }
        }
        // await this.$api.post(config.url, config.body, config.etc);
        this.isLoading = false;
        this.sectionNumber = 4;
        console.log(this.sectionNumber)
      } catch (e) {
        console.error(e);
        this.$q.notify('죄송합니다. 제출하지 못했습니다. 관리자에게 문의해 주세요.');
      }
    }
  },
  computed: {
    storageUserKey() {
      return localStorage.getItem('userKey');
    }
  },
  name: "SVC0000"
}
</script>

<template>
  <div>
    <text-button-top-bar title-text="서비스 의견"></text-button-top-bar>
    <!-- 1단계 -->
    <section v-if="sectionNumber === 1" class="nomal-page-layout voc-form-layout">
      <h3 class="headline-3">
        굿애프터눈을 사용하시면서<br>
        얼마나 만족하셨나요?
      </h3>
      <div class="l-column radio-list">
        <!--        <q-option-group v-model="serviceScore" :options="options" type="checkbox"/>-->
        <q-radio v-model="serviceScore"
                 checked-icon="check_box"
                 class="option-item"
                 dense
                 label="매우 만족"
                 size="lg"
                 unchecked-icon="check_box_outline_blank"
                 val="5"/>
        <q-radio v-model="serviceScore"
                 checked-icon="check_box"
                 class="option-item"
                 dense
                 label="만족"
                 size="lg"
                 unchecked-icon="check_box_outline_blank"
                 val="4"/>
        <q-radio v-model="serviceScore"
                 checked-icon="check_box"
                 class="option-item"
                 dense label="보통"
                 size="lg"
                 unchecked-icon="check_box_outline_blank"
                 val="3"/>
        <q-radio v-model="serviceScore"
                 checked-icon="check_box"
                 class="option-item"
                 dense
                 label="불만족"
                 size="lg"
                 unchecked-icon="check_box_outline_blank"
                 val="2"/>
        <q-radio v-model="serviceScore"
                 checked-icon="check_box"
                 class="option-item"
                 dense
                 label="매우 불만족"
                 size="lg"
                 unchecked-icon="check_box_outline_blank"
                 val="1"/>
      </div>
    </section>
    <!-- 2단계 -->
    <section v-if="sectionNumber === 2" class="nomal-page-layout voc-form-layout">
      <div class="l-column headline-area">
        <h3 class="headline-3">굿앺터눈에 전하고 싶은 의견이 있다면?</h3>
        <p class="comment-card-text">주신 의견은 꼼꼼히 읽어볼게요</p>
      </div>
      <q-input v-model="serviceComment" autogrow class="voc-comment-input" filled input-style="height: 86px;"/>
    </section>
    <!-- 3단계 -->
    <section v-if="sectionNumber === 3" class="nomal-page-layout voc-form-layout">
      <div class="l-column headline-area">
        <h3 class="headline-3">
          앞서 적어주신 의견이 어떤 내용에<br>
          해당되나요?
        </h3>
        <p class="comment-card-text">주신 의견은 꼼꼼히 읽어볼게요</p>
      </div>
      <div class="l-column radio-list">
        <q-option-group v-model="vocType" :options="options" type="checkbox"/>
      </div>
    </section>
    <!-- 4단계 -->
    <section v-if="sectionNumber === 4" class="nomal-page-layout voc-form-layout">
      <div class="l-column headline-area">
        <h3 class="headline-3">
          의견을 남겨 주셔서 감사합니다.
          꼼꼼하게 읽어볼게요.
        </h3>
        <div class="center-graphic-layout">
          <img src="../../assets/graphic/smill_imoji.png">
        </div>
      </div>
    </section>
    <q-btn
      :disable="isLoading"
      :loading="isLoading"
      class="full-width main-bottom-btn"
      flat
      label="다음"
      rounded
      size="lg"
      style="background: var(--ga-red)"
      text-color="white"
      @backButton="backSectionNumber()"
      @click="next"
    />
  </div>
</template>

<style scoped>
.voc-form-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .radio-list {
    gap: 1rem;
  }

  .headline-area {
    gap: 0.625rem;

    p {
      color: #999;
    }
  }
}

.option-item {
  font-size: 16px;
}
</style>
