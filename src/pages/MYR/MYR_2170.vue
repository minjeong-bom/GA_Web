<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import MyrTextButtonTopBar from "components/app-bar/MyrTextButtonTopBar.vue";

export default {
  name: "MYR_2120",
  components: {MyrTextButtonTopBar, TextButtonTopBar},
  props: {
    savedMarried: {
      type: String,
      default: '없음',
    },
    savedFamilys: {
      type: Number,
      default: '없음',
    },
  },
  data() {
    return {
      married: false,
      familys: Number,
      familysCountList: [
        '없음',
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ]
    }
  },
  mounted() {
    this.married = this.savedMarried;
    this.familys = this.savedFamilys;
  },
  methods: {
    save() {
      this.$emit('savePersonalInfo', this.married, this.familys);
    },
    closeModal(closePath) {
      this.$emit('closeModal', closePath);
    }
  },
}
</script>

<template>
  <div class="myr-page">
    <myr-text-button-top-bar title-text="7. 이력서 작성" back-path="myr2170" @closeModal="closeModal"/>
    <section class="sub-myr-view">
      <h2 class="headline-2">가족사항</h2>
      <div class="full-width">
        <p class="ask-card-title">배우자 유무</p>
        <div class="radio-group-right">
          <q-radio v-model="married" val="있음" label="있음"/>
          <q-radio v-model="married" val="없음" label="없음"/>
        </div>
      </div>
      <div class="full-width">
        <p class="ask-card-title">자녀수</p>
        <q-select
          v-model="familys"
          :options="familysCountList"
          label="자녀수를 선택하세요"
          style="font-size: 1.125rem"
          class="full-width"
        />
      </div>
      <q-btn
        rounded
        flat
        size="lg"
        label="저장"
        :disable="!married"
        class="full-width myr-modal-save-button"
        @click="save"
      />
    </section>

  </div>
</template>

<style scoped>
.radio-group-right {
  display: flex;
}
</style>
