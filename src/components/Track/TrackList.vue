<script setup lang="ts">
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";
import TrackItem from "@/components/Track/TrackItem.vue";

defineProps<{
  tracks: TrackInterface[]
}>()
</script>

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <TrackItem v-for="track in tracks" :track="track"></TrackItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
