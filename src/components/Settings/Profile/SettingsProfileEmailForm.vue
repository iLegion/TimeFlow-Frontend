<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Notify } from 'quasar'
import { ValidationErrors } from '@/exceptions/ValidationError.ts'
import { useUserStore } from '@/stores/user.ts'
import useUserApi from '@/api/user.http.ts'

const userApi = useUserApi()
const userStore = useUserStore()
const { errors, defineField, setErrors, setFieldError, isFieldValid } = useForm();

const [email, emailProps] = defineField('email');

const handleSubmit = async () => {
  setErrors({})

  try {
    const response = await userApi.updateEmail({
      email: email.value,
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

email.value = userStore.user?.email
</script>

<template>
  <q-form class="q-gutter-sm" autocomplete="off" @submit="handleSubmit">
    <q-input
      class="text-body1 q-mb-md"
      label="Email"
      type="email"
      placeholder="Enter email"
      input-class="q-pl-md"
      v-model="email"
      :bind="emailProps"
      :error="!isFieldValid('email') ? true : null"
      :error-message="errors.email"
      outlined
      @update:model-value="setFieldError('email', undefined)"
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