<script setup lang="ts">
import { computed } from "vue";
import { $dayjs } from "@/shared/dayjs.ts";
import TrackItem from "@/components/Track/TrackItem.vue";
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";

const props = defineProps<{
  tracks: TrackInterface[]
}>()

const emit = defineEmits<{
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
  <div>
    <div class="container">
      <div class="row">
        <div v-for="(group, day) in groupTracksByDay" class="col-12 bg-white shadow-2 q-mb-lg">
          <div class="q-pl-md q-pt-md q-pb-sm">{{ getGroupName(day) }}</div>
          <template v-for="(track, index) in group">
            <TrackItem
              :track="track"
              @delete="handleDelete"
            />

            <q-separator v-if="(index + 1) !== group.length" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
