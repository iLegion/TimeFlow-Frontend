<script setup lang="ts">
import { computed } from "vue";
import { $dayjs } from "@/shared/dayjs.ts";
import TrackTimerAdditional from '@/components/Track/Timer/TrackTimerAdditional.vue'
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

const props = defineProps<{
  track: TrackInterface
  projects: ProjectInterface[]
}>()
const emit = defineEmits<{
  (e: 'selectProject', payload: ProjectInterface): void
  (e: 'delete', id: number): void
}>()

const diffDuration = computed(() => {
  const startedAt = $dayjs(props.track.started_at)
  const finishedAt = props.track.finished_at ? $dayjs(props.track.finished_at) : $dayjs()

  return $dayjs.duration(finishedAt.diff(startedAt, 's'), 's').format('HH:mm:ss')
})
const startFinishTime = computed(() => {
  const startedAt = $dayjs(props.track.started_at)
  const finishedAt = $dayjs(props.track.finished_at)

  return startedAt.format('HH:mm') + ' - ' + finishedAt.format('HH:mm')
})
const truncatedTitle = computed(() =>
  props.track.title && props.track.title.length > 100
    ? props.track.title?.substring(0, 100) + '...'
    : props.track.title ?? 'Add title')
</script>

<template>
  <q-card class="no-shadow">
    <q-card-section horizontal>
      <q-card-section class="col-10 flex items-center">
        <div class="q-mr-md">{{ truncatedTitle }}</div>

        <TrackTimerAdditional
          :project="track.project"
          :projects="projects"
          title-position="right"
          @select="emit('selectProject', $event)"
        />
      </q-card-section>
      <q-card-section class="flex items-center text-grey-8">{{ startFinishTime }}</q-card-section>
      <q-card-section class="flex items-center">{{ diffDuration }}</q-card-section>
      <q-card-section class="flex items-center">
        <q-btn icon="more_vert" flat>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section class="text-negative" @click="emit('delete', track.id)">
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
