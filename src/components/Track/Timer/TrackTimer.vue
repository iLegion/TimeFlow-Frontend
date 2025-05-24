<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Dayjs } from "dayjs";
import { $dayjs } from "@/shared/dayjs.ts";
import type {
  TrackInterface,
  TrackUpdatePayloadInterface
} from "@/interfaces/track/track.interface.ts";
import TrackTimerInputWithMenu from "@/components/Track/Timer/TrackTimerInputWithMenu.vue";

const props = defineProps<{
  track: TrackInterface | null
}>()
const emit = defineEmits<{
  (e: 'save', payload: TrackUpdatePayloadInterface): void
}>()

const title = ref<string | null>(null)
const startedAt = ref<Dayjs>($dayjs())
const finishedAt = ref<Dayjs>($dayjs())

const timer = ref<number>(0)
const isStartedTracker = ref<boolean>(false)

let timerID: number | null = null

const init = () => {
  if (props.track) {
    title.value = props.track.title
    startedAt.value = $dayjs(props.track.started_at)
    timer.value = $dayjs.duration($dayjs().diff(startedAt.value, 's'), 's').asSeconds()

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
  emit('save', {
    title: title.value,
    started_at: startedAt.value.utc().format('YYYY-MM-DD HH:mm:ss')
  })
}
const stop = () => {
  stopTimer()
  emit('save', { title: title.value })

  timer.value = 0
  title.value = ''
  startedAt.value = $dayjs()
  finishedAt.value = $dayjs()
}

const handleChangeDateTime = (type: 'start' | 'finish', payload: Dayjs) => {
  type === 'start' ? startedAt.value = payload : finishedAt.value = payload
  timer.value = $dayjs.duration(finishedAt.value.diff(startedAt.value, 's'), 's').asSeconds()
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <q-card>
    <q-card-section horizontal>
      <q-card-section class="col-10">
        <q-input
          class="text-body1"
          v-model="title"
          placeholder="What are you working on?"
          input-class="q-pl-md"
          borderless
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
