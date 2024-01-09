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
    },
    async getResumeList() {

    }
  }
}
</script>

<template>
  <div>
    <text-button-top-bar title-text="내 이력서" button-name="작성하기" @action="navigateToNewMyr()"/>
    <section v-if="list" class="nomal-page-layout">
      <div class="layout-center-1">
        <p class="caption-1">새 이력서를 만들어 보세요</p>
        <q-btn outline
               color="red"
               label="새 이력서 만들기"
               @click="navigateToNewMyr()"
        />
      </div>
    </section>
    <section v-else>
      <AskCard v-for="item in list" :title="item.resm_title" :created="item.resm_type"/>
    </section>
  </div>
</template>

<style scoped>
.layout-center-1 {
  display: flex;
  height: 320px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
