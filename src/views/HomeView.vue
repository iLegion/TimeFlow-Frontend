<script setup lang="ts">
import { ref } from "vue";
import TrackList from "@/components/Track/TrackList.vue";
import TrackTimer from "@/components/Track/Timer/TrackTimer.vue";
import useTrackApi from "@/api/track.http.ts";
import type {
  TrackInterface,
  TrackIndexPayloadInterface,
  TrackUpdatePayloadInterface, TrackCreatePayloadInterface
} from '@/interfaces/track/track.interface.ts'
import TrackFilter from '@/components/Track/Filter/TrackFilter.vue'
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'
import useProjectApi from '@/api/project.http.ts'

const trackApi = useTrackApi()
const projectApi = useProjectApi()

const tracks = ref<TrackInterface[]>([])
const projects = ref<ProjectInterface[]>([])
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
const getProjects = async () => {
  try {
    const response = await projectApi.get()

    projects.value = response.data ?? []
  } catch (e) {
    console.log(e)
  } finally {
    isLoadingList.value = false
  }
}

const handleCreateTrack = async (payload: TrackCreatePayloadInterface) => {
  try {
    activeTrack.value = (await trackApi.create(payload)).data ?? null
  } catch (e) {
    console.error(e);
  }
}
const handleUpdateActiveTrack = async (payload: TrackUpdatePayloadInterface) => {
  if (activeTrack.value) {
    try {
      const response = await trackApi.update(activeTrack.value.id, payload)

      if (response.data) {
        if (response.data.finished_at) tracks.value = [response.data, ...tracks.value]
        else activeTrack.value = response.data
      }
    } catch (e) {
      console.error(e);
    }
  }
}
const handleUpdateFilters = (payload: TrackIndexPayloadInterface) => {
  getTracks(payload)
}
const handleDeleteTrack = async (id: number) => {
  try {
    await trackApi.destroy(id)

    tracks.value = tracks.value?.filter(track => track.id !== id)
  } catch (e) {
    console.error(e)
  }
}
const handleSelectProject = async (track: TrackInterface, project: ProjectInterface) => {
  try {
    const response = await trackApi.update(track.id, { project_id: project.id })

    if (response.data) {
      const index = tracks.value.findIndex(t => t.id === track.id)

      tracks.value.splice(index, 1, response.data);
    }
  } catch (e) {
    console.error(e);
  }
}

getTracks()
getActiveTrack()
getProjects()
</script>

<template>
  <main>
    <TrackTimer
      class="q-mb-md"
      :track="activeTrack"
      :projects="projects"
      @create="handleCreateTrack"
      @update="handleUpdateActiveTrack"
    />

    <TrackFilter
      class="q-mb-md"
      @update="handleUpdateFilters"
    />

    <TrackList
      v-if="!isLoadingList"
      :tracks="tracks"
      :projects="projects"
      @select-project="handleSelectProject"
      @delete="handleDeleteTrack"
    />
  </main>
</template>
