<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import AskCard from "components/card/AskCard.vue";
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
  name: "MYR_0000",
  components: {TextButtonTopBar, AskCard, TitleTopBar},
  data() {
    return {
      list: []
    }
  },
  methods: {
    navigateToNewMyr() {
      this.$router.push('/myr0000/create');
    }
  }
}
</script>

<template>
  <div>
    <text-button-top-bar title-text="내 이력서" button-name="작성하기" @action="navigateToNewMyr()"/>
    <section v-if="list" class="nomal-page-layout">
      <p>아직 이력서를 작성하지 않았습니다.</p>
    </section>
    <section v-else>
      <AskCard v-for="item in list" :title="item.resm_title" :created="item.resm_type"/>
    </section>
  </div>
</template>

<style scoped>

</style>
