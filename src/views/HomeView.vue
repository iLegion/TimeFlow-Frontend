<script setup lang="ts">
import { ref } from "vue";
import TrackList from "@/components/Track/TrackList.vue";
import useTrackApi from "@/api/track.http.ts";

const trackApi = useTrackApi()
const tracks = ref()
const pagination = ref()

const getTracks = async () => {
  try {
    // const response = trackApi.get()

    // tracks.value = response
  } catch (e) {}
}

getTracks()
</script>

<template>
  <main>
    <TrackList />
  </main>
</template>
