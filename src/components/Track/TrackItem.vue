<script setup lang="ts">
import { computed } from "vue";
import { $dayjs } from "@/shared/dayjs.ts";
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";

const props = defineProps<{
  track: TrackInterface
}>()
const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const diffDuration = computed(() => {
  const started_at = $dayjs(props.track.started_at)
  const finished_at = props.track.finished_at ? $dayjs(props.track.finished_at) : $dayjs()

  return $dayjs.duration(finished_at.diff(started_at, 's'), 's').format('HH:mm:ss')
})
</script>

<template>
  <q-card class="my-card">
    <q-card-section horizontal>
      <q-card-section class="col-10 flex items-center">{{ track.title ?? 'Add title' }}</q-card-section>
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
