<script setup lang="ts">
import { watch } from 'vue'
import { Notify } from 'quasar'
import { useForm } from 'vee-validate'
import { type ProjectInterface } from '@/interfaces/project/project.interface.ts'
import { ValidationErrors } from '@/exceptions/ValidationError.ts'
import useProjectApi from '@/api/project.http.ts'

const props = defineProps<{
  project: ProjectInterface | null
  mode: 'create' | 'update'
}>()
const emit = defineEmits<{
  (e: 'saved', payload: ProjectInterface): void
}>()

const projectApi = useProjectApi()
const { errors, defineField, setErrors, setFieldError, isFieldValid } = useForm();
const [title, titleProps] = defineField('title');

const create = async () => {
  return await projectApi.create({
    title: title.value,
  })
}
const update = async (id: number) => {
  return await projectApi.update(id, {
    title: title.value,
  })
}

const handleSubmit = async () => {
  setErrors({})

  try {
    let response = null

    if (props.mode === 'create') {
      response = await create()
    } else {
      if (!props.project) return

      response = await update(props.project.id)
    }

    if (response && response.data) {
      Notify.create({
        message: props.mode === 'create' ? 'Created' :'Updated',
        type: 'positive',
        timeout: 2000,
        position: 'top',
      })

      emit('saved', response.data)
    }
  } catch (e) {
    if (e instanceof ValidationErrors) {
      setErrors(e.errors)
    }
  }
}

watch(() => props.project, () => title.value = props.project?.title ?? '')
</script>

<template>
  <q-form
    class="q-gutter-sm col-12 col-md-6 col-lg-4 col-xl-3"
    autocomplete="off"
    @submit="handleSubmit"
  >
    <q-input
      class="text-body1 q-mb-md"
      label="Title"
      placeholder="Enter title"
      input-class="q-pl-md"
      v-model="title"
      :bind="titleProps"
      :error="!isFieldValid('title') ? true : null"
      :error-message="errors.title"
      outlined
      @update:model-value="setFieldError('title', undefined)"
    />

    <q-btn class="btn" :label="mode === 'create' ? 'Create' : 'Update'" type="submit" />
  </q-form>
</template>

<style scoped>

</style>