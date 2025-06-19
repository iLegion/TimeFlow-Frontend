<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Notify } from 'quasar'
import { ValidationErrors } from '@/exceptions/ValidationError.ts'
import { useUserStore } from '@/stores/user.ts'
import useUserApi from '@/api/user.http.ts'

const userApi = useUserApi()
const userStore = useUserStore()
const { errors, defineField, setErrors, setFieldError, isFieldValid } = useForm();

const [name, nameProps] = defineField('name');

const handleSubmit = async () => {
  setErrors({})

  try {
    const response = await userApi.update({
      name: name.value,
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

name.value = userStore.user?.name
</script>

<template>
  <div>
    <div class="text-h4 text-bold q-mb-lg">Personal data</div>

    <q-form class="q-gutter-sm" autocomplete="off" @submit="handleSubmit">
      <q-input
        class="text-body1 q-mb-md"
        label="Enter name"
        placeholder="Name"
        input-class="q-pl-md"
        v-model="name"
        :bind="nameProps"
        :error="!isFieldValid('name') ? true : null"
        :error-message="errors.name"
        outlined
        @update:model-value="setFieldError('name', undefined)"
      />

      <q-btn class="btn" label="Update" type="submit" />
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  color: $grey-2 !important;
  background-color: $dark !important;
}
</style>