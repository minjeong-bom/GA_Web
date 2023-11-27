<template>
  <div>
    <top-bar :title="'1:1 문의 사항'" :buttonText="'문의하기'" @buttonEvent="addAsk"></top-bar>

    <top-banner></top-banner>

    <div class="card-list" >
      <ask-card v-for="item in askList" :title="item.title" :created="item.created" :status="item.status" @click="askDetail(item.id)"></ask-card>
    </div>

  </div>
</template>

<script>
import TopBarSub from "components/app-bar/TopBarSub.vue";
import AskCard from "components/card/AskCard.vue";
export default {
  data() {
    return {
      askList: [
        {
          id: 'testing01',
          title: '가나다라마바사아자차카타파하가나다라마바사 최대 40자',
          created: '2023.10.10',
          status: '답변 완료',
        },
        {
          id: 'testing02',
          title: '가나다라마바사아자차카타파하가나다라마바사 최대 40자',
          created: '2023.10.10',
          status: '답변 완료',
        },
        {
          id: 'testing03',
          title: '가나다라마바사아자차카타파하가나다라마바사 최대 40자',
          created: '2023.10.10',
          status: '답변 완료',
        },
      ]
    }
  },
  components: {
    'top-bar': TopBarSub,
    'ask-card': AskCard,
  },
  methods: {
    addAsk () {
      this.$router.push('/myp3110');
    },
    askDetail(askid) {
      this.$router.push({path: '/myp3100', query: { askid: askid }});
    }
  }
}
</script>

<style scoped>
.card-list {
  padding: 0 20px;
}
</style>
