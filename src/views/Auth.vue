<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";

type Mode = 'login' | 'register'

const mode = ref<Mode>('login')
</script>

<template>
  <main>
    <q-card class="auth-card q-pa-md">
      <q-card-section v-if="mode === 'login'">
        <LoginForm />
      </q-card-section>
      <q-card-section v-else>
        <RegisterForm />
      </q-card-section>
      <q-card-section class="flex justify-center">
        <q-btn
          flat
          @click="mode === 'login' ? mode = 'register' : mode = 'login'"
        >
          {{ mode === 'login' ? 'Need to register?' : 'Need to login?' }}
        </q-btn>
      </q-card-section>
    </q-card>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .auth-card {
    width: 500px;
  }
}
</style>
