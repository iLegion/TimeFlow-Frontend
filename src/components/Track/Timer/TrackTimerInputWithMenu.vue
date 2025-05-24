<script setup lang="ts">
import { computed, ref } from "vue";
import type { QInput } from "quasar";
import type { Dayjs } from "dayjs";
import { $dayjs } from "@/shared/dayjs.ts";

type TimeType = 'start' | 'finish'

const props = defineProps<{
  timer: number
  startedAt: Dayjs
  finishedAt: Dayjs
}>()
const emit = defineEmits<{
  (e: 'changeStartTime', payload: Dayjs): void
  (e: 'changeFinishTime', payload: Dayjs): void
}>()

const inputRef = ref<QInput>()
const menu = ref<boolean>(false)
const selectedTimeType = ref<TimeType>('start')

const formattedTimer = computed<string>(() => {
  const hours = Math.floor(props.timer / 3600)
  const minutes = Math.floor((props.timer % 3600) / 60)
  const seconds = props.timer % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':')
})
const date = computed<string>(() => {
  return (selectedTimeType.value === 'start' ? props.startedAt : props.finishedAt).format('YYYY-MM-DD')
})
const startTime = computed<string>(() => props.startedAt.format('HH:mm'))
const finishTime = computed<string>(() => props.finishedAt.format('HH:mm'))
const getTargetEl = computed(() => inputRef.value?.$el)

const handleChangeTimeInput = (type: TimeType, value: string | number | null) => {
  typeof value === "string" && onChangeTime(type, date.value, value)
}
const handleChangeDateInput = (value: string) => {
  onChangeTime(
    selectedTimeType.value,
    value,
    selectedTimeType.value === 'start' ? startTime.value : finishTime.value
  )

  if (selectedTimeType.value === 'start') {
    if ($dayjs(value).isAfter(props.finishedAt))
      onChangeTime(selectedTimeType.value, value, finishTime.value)
  } else if (selectedTimeType.value === 'finish') {
    if ($dayjs(value).isBefore(props.finishedAt))
      onChangeTime(selectedTimeType.value, value, startTime.value)
  }
}
const handleFocusTimeInput = (type: TimeType) => selectedTimeType.value = type

const onChangeTime = (type: TimeType, date: string, time: string) => {
  const splitTime = time.split(':')
  const payload = $dayjs(date)
    .set('hours', Number(splitTime[0]))
    .set('minutes', Number(splitTime[1]))

  if (type === 'start') emit('changeStartTime', payload)
  else emit('changeFinishTime', payload)
}
</script>

<template>
  <div>
    <q-input
      ref="inputRef"
      class="text-body1"
      input-class="text-center"
      :model-value="formattedTimer"
      mask="##:##:##"
      borderless
      readonly
      :autofocus="false"
      @focus="menu = true"
    />
    <q-menu
      v-model="menu"
      anchor="bottom left"
      self="top left"
      :context-menu="false"
      :target="getTargetEl"
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-card style="width: 400px">
        <q-card-section>
          <div class="row q-gutter-x-sm">
            <div class="col">
              <q-input
                :model-value="startTime"
                label="Start"
                mask="##:##"
                outlined
                :autofocus="true"
                @update:model-value="handleChangeTimeInput('start', $event)"
                @focus="handleFocusTimeInput('start')"
              />
            </div>
            <div class="col">
              <q-input
                label="End"
                mask="##:##"
                :model-value="finishTime"
                :autofocus="false"
                outlined
                @update:model-value="handleChangeTimeInput('finish', $event)"
                @focus="handleFocusTimeInput('finish')"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row">
            <div class="col">
              <q-date
                style="width: 100%"
                first-day-of-week="1"
                mask="YYYY-MM-DD"
                :model-value="date"
                minimal
                years-in-month-view
                square
                flat
                @update:model-value="handleChangeDateInput($event)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </div>
</template>

<style scoped></style>
