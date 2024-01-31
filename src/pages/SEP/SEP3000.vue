<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "SEP3000",
  components: {TitleTopBar},
  data() {
    return {
      sectionNumber: 1,
      serviceComment: [],
      serviceCommentInput: '',
      options: [
        {
          label: '자주 사용하지 않아요',
          value: '자주 사용하지 않아요',
        },
        {
          label: '앱 오류가 있어요',
          value: '앱 오류가 있어요',
        },
        {
          label: '사용하기 어려워요',
          value: '사용하기 어려워요',
        },
        {
          label: '도움되는 정보가 부족해요',
          value: '도움되는 정보가 부족해요',
        },
        {
          label: '알림이 너무 자주와요',
          value: '알림이 너무 자주와요',
        },
        {
          label: '혜택이 적어요',
          value: '혜택이 적어요',
        },
        {
          label: '직접 입력',
          value: '직접 입력',
        },
      ],
      isLoading: false,
    }
  },
  computed: {
    isEditMode() {
      // serviceComment 배열 내용 중에 '직접 입력'이 있는지 확인하는 computed 속성
      return this.serviceComment.includes('직접 입력');
    },
    ready() {
      if (this.isEditMode) {
        return (this.serviceCommentInput !== '') && (this.serviceCommentInput !== null);
      }
      return this.serviceComment.length > 0
    },
    nickname() {
      return localStorage.getItem('userName');
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar title-text="회원 탈퇴"/>
    <section v-if="sectionNumber === 1" class="nomal-page-layout">
      <h3 class="headline-3">
        탈퇴하려는 이유가 무엇인가요?
      </h3>
      <div class="l-column radio-list">
        <q-option-group v-model="serviceComment" :options="options" type="checkbox"/>
        <q-input v-if="isEditMode" v-model="serviceCommentInput" :model-value="serviceCommentInput" label="의견을 입력해 주세요"
                 outlined
                 type="textarea"></q-input>
      </div>
      <q-btn
        :disable="!ready"
        :loading="isLoading"
        class="full-width main-bottom-btn"
        flat
        label="다음"
        rounded
        size="lg"
        style="background: var(--ga-red)"
        text-color="white"
        @backButton="backSectionNumber()"
        @click="sectionNumber = 2"
      />
    </section>
    <section v-if="sectionNumber === 2" class="nomal-page-layout">
      <h3 class="headline-3">
        {{ nickname }}님, 탈퇴를 도와드릴게요.
      </h3>
      <div class="l-column radio-list">
        <q-option-group v-model="serviceComment" :options="options" type="checkbox"/>
        <q-input v-if="isEditMode" v-model="serviceCommentInput" :model-value="serviceCommentInput" label="의견을 입력해 주세요"
                 outlined
                 type="textarea"></q-input>
      </div>
      <q-btn
        :disable="!ready"
        :loading="isLoading"
        class="full-width main-bottom-btn"
        flat
        label="다음"
        rounded
        size="lg"
        style="background: var(--ga-red)"
        text-color="white"
        @backButton="backSectionNumber()"
        @click="sectionNumber = 2"
      />
    </section>
  </div>
</template>

<style scoped>
.nomal-page-layout {
  .headline-3 {
    padding: 1.5rem 1rem 0.625rem 1rem;
  }

  .radio-list {
    padding: 1rem 1rem 0rem 1rem;
    gap: 1rem;
  }
}
</style>
