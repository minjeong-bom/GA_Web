<script>
export default {
  props: {
    buttonName: String,
    titleText: String,
    backAction: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<template>
  <div class="text-button-top-bar">
    <!-- 뒤로가기 버튼 -->
    <div class="back-button-area">
      <q-btn v-if="!backAction" flat round @click="goBack">
        <q-icon name="navigate_before"/>
      </q-btn>
      <q-btn v-else @click="$emit('backButton')">
        <q-icon name="navigate_before"/>
      </q-btn>
    </div>
    <h2 class="headline-area">{{ titleText ? titleText : "" }}</h2>
    <div class="right-button-area">
      <q-btn :label="buttonName" class="top-bar-button" dense flat @click="$emit('action')"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-button-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;

  padding-right: 16px;
  background: transparent;

  h2 {
    color: var(--k-85);
    text-align: center;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .top-bar-button {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    letter-spacing: -0.4px;
  }

  .back-button-area {
    width: 20%;
    align-items: flex-start;
  }

  .right-button-area {
    width: 20%;
    text-align: right;
  }

  h2 {
    width: 60%;
  }

}


</style>
