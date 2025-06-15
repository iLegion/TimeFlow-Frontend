<script setup lang="ts">
import { useRouter } from "vue-router";
import { useForm } from 'vee-validate';
import useAuthApi from "@/api/auth.http.ts";
import { useUserStore } from "@/stores/user.ts";
import { ValidationErrors } from "@/exceptions/ValidationError.ts";

const router = useRouter()
const authApi = useAuthApi()
const userStore = useUserStore()

const { errors, defineField, setErrors, setFieldError, isFieldValid } = useForm();
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const handleSubmit = async () => {
  setErrors({})

  try {
    const response = await authApi.login({ email: email.value, password: password.value })

    if (response && response.data && response.token) {
      userStore.setUser(response.data)
      localStorage.setItem('token', response.token)

      await router.push({ name: 'home' })
    }
  } catch (e) {
    if (e instanceof ValidationErrors) {
      setErrors(e.errors)
    }
  }
}
</script>

<template>
  <q-form class="q-gutter-sm" @submit="handleSubmit">
    <q-input
      class="text-body1"
      type="email"
      v-model="email"
      :bind="emailProps"
      :error="!isFieldValid('email') ? true : null"
      :error-message="errors.email"
      placeholder="Email"
      input-class="q-pl-md"
      outlined
      @update:model-value="setFieldError('email', undefined)"
    />
    <q-input
      class="text-body1"
      type="password"
      v-model="password"
      :bind="passwordProps"
      :error="!isFieldValid('password') ? true : null"
      :error-message="errors.password"
      placeholder="Password"
      input-class="q-pl-md"
      outlined
      @update:model-value="setFieldError('password', undefined)"
    />

    <div class="text-center q-pt-md">
      <q-btn label="Log in" type="submit" />
    </div>
  </q-form>
</template>

<style scoped></style>
