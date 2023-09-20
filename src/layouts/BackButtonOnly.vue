<template>
  <div>
    <q-layout>
      <q-header reveal elevated class="bg-white text-black shadow-0">
        <q-toolbar>
          <q-btn flat round dense size="1.2rem">
            <i class="fa-solid fa-arrow-left-long" @click="pageBack()"></i>
          </q-btn>
        </q-toolbar>
      </q-header>


      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();

export default defineComponent({
  name: 'SubLayout',
  setup () {

  },
  methods : {
    pageBack() {
      this.$router.go(-1);
    },
  }
})
</script>

<style>
font-awesome-icon {
  color: black;
}
</style>
