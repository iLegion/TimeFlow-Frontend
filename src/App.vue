<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import useUserApi from "@/api/user.http.ts";
import { useUserStore } from "@/stores/user.ts";
import { Unauthorized } from "@/exceptions/Unauthorized.ts";

const router = useRouter()
const userApi = useUserApi()
const userStore = useUserStore()

const token = localStorage.getItem('token')

const getUser = async () => {
  try {
    const response = await userApi.me()

    if (response && response.data && token) {
      userStore.setUser(response.data)
      userStore.setToken(token)

      await router.push({ name: 'home' })
    }
  } catch (e) {
    console.log(e);

    if (e instanceof Unauthorized) {
      localStorage.removeItem('token')
      await router.push({ name: 'auth' })
    }
  }
}

if (token) getUser()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
