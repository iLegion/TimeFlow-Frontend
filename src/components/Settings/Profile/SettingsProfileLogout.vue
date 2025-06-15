<script setup lang="ts">
import { useRouter } from 'vue-router'
import useAuthApi from '@/api/auth.http.ts'
import { useUserStore } from '@/stores/user.ts'

const router = useRouter()
const authApi = useAuthApi()
const userStore = useUserStore()

const handleSubmit = async () => {
  try {
    await authApi.logout()
    userStore.setUser(null)
    localStorage.removeItem('token')
    await router.push({ name: 'auth' })
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <q-btn icon="output" label="Log out" @click="handleSubmit" />
</template>

<style scoped>

</style>