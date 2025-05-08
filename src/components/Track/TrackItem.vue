<script setup lang="ts">
import type { TrackInterface } from "@/interfaces/track/track.interface.ts";

defineProps<{
  track: TrackInterface
}>()
</script>

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-10">
          {{ track.id }}
        </div>
        <div class="col-2">
          Time
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
