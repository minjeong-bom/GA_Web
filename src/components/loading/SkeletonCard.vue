<script>
export default {
  name: "SkeletonCard",
  props: {
    lines: Number,
  }
}
</script>

<template>
  <div style="width: 100%">
    <q-skeleton v-for="n in lines" :key="n" style="margin-bottom: 12px; height: 300px" />
  </div>
</template>

<style scoped>

</style>
