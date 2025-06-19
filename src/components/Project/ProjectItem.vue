<script setup lang="ts">
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

defineProps<{
  project: ProjectInterface
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <q-card class="no-shadow">
    <q-card-section horizontal>
      <q-card-section class="col-11 flex items-center">
        <router-link class="text-black text-decoration-none" :to="'projects/' + project.id">
          {{ project.title }}
        </router-link>
      </q-card-section>
      <q-card-section class="flex items-center">
        <q-btn icon="more_vert" flat>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section class="text-negative" @click="emit('delete', project.id)">
                  Delete
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>