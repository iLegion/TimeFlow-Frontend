<script setup lang="ts">
import { computed } from "vue";
import { $dayjs } from "@/shared/dayjs.ts";
import TrackItem from "@/components/Track/TrackItem.vue";
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

const props = defineProps<{
  tracks: TrackInterface[]
  projects: ProjectInterface[]
}>()

const emit = defineEmits<{
  (e: 'selectProject', track: TrackInterface, project: ProjectInterface): void
  (e: 'delete', id: number): void
}>()

const groupTracksByDay = computed(() => {
  const grouped: Record<string, TrackInterface[]> = {}

  props.tracks.forEach(track => {
    const dayKey = $dayjs(track.started_at).format('YYYY-MM-DD')

    if (!grouped[dayKey]) {
      grouped[dayKey] = []
    }

    grouped[dayKey].push(track)
  })

  return grouped
})

const getGroupName = (value: string) => $dayjs(value).format('ddd, D MMM')

const handleDelete = (id: number) => emit('delete', id)
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(group, day) in groupTracksByDay"
        :key="'track-list-' + day"
        class="col-12 bg-white shadow-2 q-mb-lg"
      >
        <div class="q-pl-md q-pt-md q-pb-sm">{{ getGroupName(day) }}</div>
        <template
          v-for="(track, index) in group"
          :key="'track-item-' + index"
        >
          <TrackItem
            :track="track"
            :projects="projects"
            @select-project="emit('selectProject', track, $event)"
            @delete="handleDelete"
          />

          <q-separator
            :key="'track-separator-' + index"
            v-if="(index + 1) !== group.length"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
