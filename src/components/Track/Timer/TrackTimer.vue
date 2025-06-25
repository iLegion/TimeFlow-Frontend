<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { Dayjs } from "dayjs";
import TrackTimerInputWithMenu from "@/components/Track/Timer/TrackTimerInputWithMenu.vue";
import TrackTimerAdditional from '@/components/Track/Timer/TrackTimerAdditional.vue'
import { $dayjs } from "@/shared/dayjs.ts";
import type {
  TrackInterface,
  TrackCreatePayloadInterface,
  TrackUpdatePayloadInterface,
} from "@/interfaces/track/track.interface.ts";
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

const props = defineProps<{
  track: TrackInterface | null
  projects: ProjectInterface[]
}>()
const emit = defineEmits<{
  (e: 'create', payload: TrackCreatePayloadInterface): void
  (e: 'update', payload: TrackUpdatePayloadInterface): void
}>()

const title = ref<string | null>(null)
const startedAt = ref<Dayjs>($dayjs())
const finishedAt = ref<Dayjs>($dayjs())
const project = ref<ProjectInterface | null>(null)

const timer = ref<number>(0)
const isStartedTracker = ref<boolean>(false)

let timerID: number | null = null

const getPayloadForUpdate = () => {
  const payload: TrackUpdatePayloadInterface = {}

  if (props.track?.title !== title.value) payload.title = title.value
  if (props.track?.project?.id !== project.value?.id) payload.project_id = project.value?.id
  if ($dayjs(props.track?.started_at).diff(startedAt.value.utc(), 'minutes')) payload.started_at = startedAt.value.utc().format('YYYY-MM-DD HH:mm:ss')
  if ($dayjs(props.track?.finished_at).diff(finishedAt.value.utc(), 'minutes')) payload.finished_at = finishedAt.value.utc().format('YYYY-MM-DD HH:mm:ss')

  return payload
}

const init = () => {
  stopTimer()

  if (props.track) {
    title.value = props.track.title
    startedAt.value = $dayjs(props.track.started_at)
    timer.value = $dayjs.duration($dayjs().diff(startedAt.value, 's'), 's').asSeconds()
    project.value = props.track.project

    startTimer()
  }
}
const startTimer = () => {
  isStartedTracker.value = true
  timerID = setInterval(() => timer.value++, 1000)
}
const stopTimer = () => {
  isStartedTracker.value = false

  if (timerID) clearInterval(timerID)
}
const start = () => {
  startTimer()

  if (props.track) {
    emit('update', getPayloadForUpdate())
  } else {
    const payload: TrackCreatePayloadInterface = {}

    if (title.value) payload.title = title.value
    if (project.value?.id) payload.project_id = project.value?.id ?? null

    emit('create', payload)
  }
}
const stop = () => {
  stopTimer()
  emit('update', { ...getPayloadForUpdate(), finished_at: $dayjs().utc().format('YYYY-MM-DD HH:mm:ss') })

  timer.value = 0
  title.value = ''
  startedAt.value = $dayjs()
  finishedAt.value = $dayjs()
  project.value = null
}

const handleChangeDateTime = (type: 'start' | 'finish', payload: Dayjs) => {
  if (type === 'start') startedAt.value = payload
  else finishedAt.value = payload

  timer.value = $dayjs.duration(finishedAt.value.diff(startedAt.value, 's'), 's').asSeconds()
}
const handleSelectProject = (payload: ProjectInterface) => {
  project.value = payload

  emit('update', { project_id: project.value?.id })
}

watch(() => props.track, () => init())

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <q-card>
    <q-card-section horizontal>
      <q-card-section class="col-9">
        <q-input
          class="text-body1"
          v-model="title"
          placeholder="What are you working on?"
          input-class="q-pl-md"
          borderless
        />
      </q-card-section>
      <q-card-section class="col-2">
        <TrackTimerAdditional
          class="full-width full-height"
          title-position="left"
          :project="project"
          :projects="projects"
          @select="handleSelectProject"
        />
      </q-card-section>
      <q-card-section>
        <TrackTimerInputWithMenu
          :timer="timer"
          :started-at="startedAt"
          :finished-at="finishedAt"
          @change-start-time="handleChangeDateTime('start', $event)"
          @change-finish-time="handleChangeDateTime('finish', $event)"
        />
      </q-card-section>
      <q-card-section class="flex items-center">
        <q-btn v-if="!isStartedTracker" round icon="play_arrow" @click="start" />
        <q-btn v-if="isStartedTracker" round icon="pause" @click="stop" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>
