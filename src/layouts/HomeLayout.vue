<script>
import TopBarMain from "components/app-bar/HomeTopBar.vue";

export default {
  name: 'home-layout',
  components: { TopBarMain },
}
</script>

<template>
  <div>
    <q-layout>
      <q-page-container>
        <!-- 상단바 -->
        <top-bar-main></top-bar-main>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style>

</style>
