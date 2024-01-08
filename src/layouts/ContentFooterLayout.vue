<script>
import Footer from "../pages/Footer.vue"

export default {
  name: 'full-page-layout',
  components: {
    Footer,
  }
}
</script>

<template>
  <div>
    <q-layout>
      <q-page-container>
        <router-view/>
        <Footer/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style>

</style>
