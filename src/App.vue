<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from "@/stores/user.ts";
import SidebarDrawer from '@/components/Sidebar/SidebarDrawer.vue'

const userStore = useUserStore()
</script>

<template>
  <q-layout view="lHh Lpr fFf" style="height: 100vh" container>
    <SidebarDrawer v-if="userStore.user" />

    <q-page-container>
      <q-page>
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

</style>
