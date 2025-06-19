<script setup lang="ts">
import ProjectItem from '@/components/Project/ProjectItem.vue'
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

defineProps<{
  projects: ProjectInterface[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const handleDelete = (id: number) => emit('delete', id)
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <q-card>
          <template
            v-for="(project, index) in projects"
            :key="'project-item-' + index"
          >
            <q-card-section class="q-pa-none">
              <ProjectItem
                :project="project"
                @delete="handleDelete"
              />
            </q-card-section>
            <q-separator
              :key="'project-separator-' + index"
              v-if="(index + 1) !== projects.length"
            />
          </template>

        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>