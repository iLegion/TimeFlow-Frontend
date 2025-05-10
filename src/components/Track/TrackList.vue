<script setup lang="ts">
import TrackItem from "@/components/Track/TrackItem.vue";
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";

defineProps<{
  tracks: TrackInterface[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const handleDelete = (id: number) => emit('delete', id)
</script>

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <TrackItem
            v-for="track in tracks"
            :track="track"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
