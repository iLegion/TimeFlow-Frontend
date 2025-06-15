<script setup lang="ts">
const handleClickGoogle = () => window.location.href = 'http://time-tracking.test/api/auth/social/google/redirect'
const handleClickGithub = () => window.location.href = 'http://time-tracking.test/api/auth/social/github/redirect'
</script>

<template>
  <div>
    <q-btn icon="ion-logo-google" flat round @click="handleClickGoogle" />
    <q-btn icon="ion-logo-github" flat round @click="handleClickGithub" />
  </div>
</template>

<style scoped>

</style>