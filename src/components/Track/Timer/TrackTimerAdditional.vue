<script setup lang="ts">
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

defineProps<{
  projects: ProjectInterface[]
  project: ProjectInterface | null
  titlePosition: 'left' | 'right'
}>()

const emit = defineEmits<{
  (e: 'select', id: ProjectInterface): void
}>()

const getTruncatedProjectTitle = (value: string, length: number = 50) => {
  return value.length > length ? value.substring(0, length) + '...' : value
}

const handleSelectProject = (project: ProjectInterface) => {
  emit('select', project)
}
</script>

<template>
  <div class="flex items-center justify-end">
    <div v-if="project && titlePosition === 'left'" class="text-grey-8">{{ getTruncatedProjectTitle(project?.title, 45) }}</div>
    <q-btn icon="folder_open" flat>
      <q-menu>
        <q-list>
          <q-item
            v-for="(project, index) in projects"
            :key="'timer-project-item' + index"
            clickable
            v-close-popup
          >
            <q-item-section @click="handleSelectProject(project)">
              {{ getTruncatedProjectTitle(project.title) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <div v-if="project && titlePosition === 'right'" class="text-grey-8">{{ getTruncatedProjectTitle(project?.title, 45) }}</div>
  </div>
</template>

<style scoped>

</style>