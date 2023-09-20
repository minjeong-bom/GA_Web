<script>
export default {
  props: {
    title: String,
    buttonText: String,
    buttonEvent: String,
    buttonStyle: String, // 'text' or 'icon'
  },
  methods : {
    navigateBack() {
      this.$router.go(-1);
      this.$emit('');
    },
    emitCall() {
      this.$emit(`buttonEvent`);
    },
  }
}
</script>

<template>
<div>
  <div class="top-bar">
    <div class="tap-bar-inner">
      <div class="top-bar-back-title-wrap">
        <button @click="navigateBack()">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <p>{{ title }}</p>
      </div>
      <button class="control-button" @click="emitCall">
        {{ buttonText }}
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>
.top-bar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding-top: calc(env(safe-area-inset-top) + 16px);
  padding-bottom: 16px;
}

.tap-bar-inner {
  display: flex;
  padding: 0px 24px;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
  align-items: center;
}

.top-bar-back-title-wrap {
  display: flex;
  gap: 20px;
  align-items: center;
}

button {
  width: 24px;
  height: 24px;

  border: 0;
  padding: 0;

  font-size: 20px;
  background-color: transparent;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
}

.control-button {
  width: auto;
  height: auto;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

p {
  display: inline-block;

  margin-block-start: 0;
  margin-block-end: 0;

  font-size: 20px;
  font-weight: 700;
  color: #000;
}
</style>
