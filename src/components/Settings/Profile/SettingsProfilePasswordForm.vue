<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Notify } from 'quasar'
import { ValidationErrors } from '@/exceptions/ValidationError.ts'
import { useUserStore } from '@/stores/user.ts'
import useUserApi from '@/api/user.http.ts'

const userApi = useUserApi()
const userStore = useUserStore()
const { errors, defineField, setErrors, setFieldError, isFieldValid } = useForm();

const [password, passwordProps] = defineField('password');
const [passwordConfirmation, passwordConfirmationProps] = defineField('password_confirmation');

const handleSubmit = async () => {
  setErrors({})

  try {
    const response = await userApi.updatePassword({
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    if (response && response.data) {
      userStore.setUser(response.data)

      Notify.create({
        message: 'Updated',
        type: 'positive',
        timeout: 2000,
        position: 'top',
      })
    }
  } catch (e) {
    if (e instanceof ValidationErrors) {
      setErrors(e.errors)
    }
  }
}
</script>

<template>
  <q-form class="q-gutter-sm" autocomplete="off" @submit="handleSubmit">
    <q-input
      class="text-body1"
      label="Password"
      type="password"
      placeholder="Enter password"
      input-class="q-pl-md"
      v-model="password"
      :bind="passwordProps"
      :error="!isFieldValid('password') ? true : null"
      :error-message="errors.password"
      outlined
      @update:model-value="setFieldError('password', undefined)"
    />
    <q-input
      class="text-body1 q-mb-md"
      label="Password confirmation"
      type="password"
      placeholder="Enter password confirmation"
      input-class="q-pl-md"
      v-model="passwordConfirmation"
      :bind="passwordConfirmationProps"
      :error="!isFieldValid('password_confirmation') ? true : null"
      :error-message="errors.password_confirmation"
      outlined
      @update:model-value="setFieldError('password_confirmation', undefined)"
    />

    <q-btn class="btn" label="Update" type="submit" />
  </q-form>
</template>

<style lang="scss" scoped>
.btn {
  color: $grey-2 !important;
  background-color: $dark !important;
}
</style>