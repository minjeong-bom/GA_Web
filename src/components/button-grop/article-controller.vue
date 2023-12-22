<script>
export default {
  name: "article-controller",
  props: {
    articleKey: String,
    userKey: String,
  },
  methods: {
    async addBookmark() {
      try {
        const config = {
          url: '',
          body: {
            data_prefix : 'bc',
            data_title: this.articleKey, // 게시글 키
            data_foreign_key: 'LBUSDDGP',
            data_foreign_key2: 'SWMUCCYD',
            bc_writer_name: this.userKey
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom'
            }
          }
        }


      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<template>
  <div>
    <section>
      <q-btn flat round icon="text_fields" style="opacity: 0.3"/>
      <q-btn flat round icon="bookmark" @click="addBookmark()" style="opacity: 0.3"/>
      <q-btn flat round icon="share" style="opacity: 0.3"/>
    </section>
  </div>
</template>

<style scoped>

</style>
