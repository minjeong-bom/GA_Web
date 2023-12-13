<script>
import TopBarMain from "components/app-bar/HomeTopBar.vue";
import BottomAppBar from "components/app-bar/BottomAppBar.vue";

export default {
  name: 'home-layout',
  components: {
		TopBarMain,
	  BottomAppBar,
  },
}
</script>

<template>
  <div>
    <q-layout>
      <q-page-container>
        <!-- 상단바 -->
        <top-bar-main></top-bar-main>
        <router-view class="bottom-margin" />
	      <!-- 하단바 -->
	      <bottom-app-bar></bottom-app-bar>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style>
.bottom-margin {
	margin-bottom: 10rem;
}
</style>
