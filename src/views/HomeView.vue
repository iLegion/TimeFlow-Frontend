<script setup lang="ts">
import { ref } from "vue";
import TrackList from "@/components/Track/TrackList.vue";
import TrackTimer from "@/components/Track/Timer/TrackTimer.vue";
import useTrackApi from "@/api/track.http.ts";
import type {
  TrackInterface,
  TrackIndexPayloadInterface,
  TrackUpdatePayloadInterface
} from "@/interfaces/track/track.interface.ts";
import TrackFilter from '@/components/Track/Filter/TrackFilter.vue'

const trackApi = useTrackApi()

const tracks = ref<TrackInterface[]>([])
const activeTrack = ref<TrackInterface | null>(null)

const isLoadingList = ref<boolean>(true)

const getTracks = async (payload: TrackIndexPayloadInterface | null = null) => {
  try {
    const response = await trackApi.get(payload)

    tracks.value = response.data ?? []
  } catch (e) {
    console.log(e)
  } finally {
    isLoadingList.value = false
  }
}
const getActiveTrack = async () => {
  try {
    const response = await trackApi.getActive()

    activeTrack.value = response.data ?? null
  } catch (e) {
    console.log(e)
  }
}

const handleDeleteTrack = async (id: number) => {
  try {
    await trackApi.destroy(id)

    tracks.value = tracks.value?.filter(track => track.id !== id)
  } catch (e) {
    console.log(e)
  }
}
const handleSaveTrack = async (payload: TrackUpdatePayloadInterface) => {
  try {
    if (activeTrack.value) {
      const response = await trackApi.update(activeTrack.value.id, payload)

      if (response.data) tracks.value = [response.data, ...tracks.value]

      activeTrack.value = null
    } else {
      activeTrack.value = (await trackApi.create(payload)).data ?? null
    }
  } catch (e) {
    console.log(e);
  }
}
const handleUpdateFilters = (payload: TrackIndexPayloadInterface) => {
  getTracks(payload)
}

getTracks()
getActiveTrack()
</script>

<template>
  <main>
    <TrackTimer
      class="q-mb-md"
      :track="activeTrack"
      @save="handleSaveTrack"
    />

    <TrackFilter
      class="q-mb-md"
      @update="handleUpdateFilters"
    />

    <TrackList
      v-if="!isLoadingList"
      :tracks="tracks"
      @delete="handleDeleteTrack"
    />
  </main>
</template>
