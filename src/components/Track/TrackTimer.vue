<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from "vue"
import { type QInput } from "quasar"
import { Dayjs } from "dayjs"
import { $dayjs } from "@/shared/dayjs.ts"
import type {
  TrackInterface,
  TrackUpdatePayloadInterface
} from "@/interfaces/track/track.interface.ts";

const props = defineProps<{
  track: TrackInterface | null
}>()

const emit = defineEmits<{
  (e: 'save', payload: TrackUpdatePayloadInterface): void
}>()

const inputRef = ref<QInput>()
const menu = ref<boolean>(false)

const title = ref<string | null>(null)
const startedAt = ref<Dayjs | null>(null)
const finishedAt = ref<Dayjs | null>(null)

const timer = ref<number>(0)
const isStartedTracker = ref<boolean>(false)
let timerID: number | null = null

const formattedTimer = computed(() => {
  const hours = Math.floor(timer.value / 3600)
  const minutes = Math.floor((timer.value % 3600) / 60)
  const seconds = timer.value % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':')
})
// const getTargetEl = computed(() => inputRef.value?.$el);

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
  if (!startedAt.value) startedAt.value = $dayjs();

  startTimer()
  emit('save', { title: title.value })
}
const stop = () => {
  stopTimer()
  emit('save', { title: title.value })

  timer.value = 0
  title.value = ''
  startedAt.value = null
  finishedAt.value = null
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
        <q-input
          ref="inputRef"
          class="text-body1"
          input-class="text-center"
          :model-value="formattedTimer"
          mask="##:##:##"
          borderless
          readonly
          @focus="menu = true"
        />
<!--        <q-menu-->
<!--          v-model="menu"-->
<!--          anchor="bottom left"-->
<!--          self="top left"-->
<!--          :context-menu="false"-->
<!--          :target="getTargetEl"-->
<!--          transition-show="jump-down"-->
<!--          transition-hide="jump-up"-->
<!--        >-->
<!--          <q-card style="width: 400px">-->
<!--            <q-card-section>-->
<!--              <div class="row q-gutter-x-sm">-->
<!--                <div class="col">-->
<!--                  <q-input v-model="startTime" label="Start" mask="##:##" outlined />-->
<!--                </div>-->
<!--                <div class="col">-->
<!--                  <q-input v-model="endTime" label="End" mask="##:##" outlined />-->
<!--                </div>-->
<!--              </div>-->
<!--            </q-card-section>-->

<!--            <q-separator />-->

<!--            <q-card-section>-->
<!--              <div class="row">-->
<!--                <div class="col">-->
<!--                  <q-date-->
<!--                    style="width: 100%"-->
<!--                    v-model="date"-->
<!--                    minimal-->
<!--                    years-in-month-view-->
<!--                    first-day-of-week="1"-->
<!--                    square-->
<!--                    flat-->
<!--                  />-->
<!--                </div>-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--          </q-card>-->
<!--        </q-menu>-->
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
