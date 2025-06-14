<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Dayjs } from 'dayjs'
import { $dayjs } from '@/shared/dayjs.ts'
import type { TrackIndexPayloadInterface } from '@/interfaces/track/track.interface.ts'

const emit = defineEmits<{
  (e: 'update', payload: TrackIndexPayloadInterface): void
}>()

const dateFrom = ref<Dayjs>($dayjs().subtract(1, 'week'))
const dateTo = ref<Dayjs>($dayjs())

const formatedDateFrom = computed(() => dateFrom.value.format('DD-MM-YYYY'))
const formatedDateTo = computed(() => dateTo.value.format('DD-MM-YYYY'))
const canClear = computed(() => {
  const isUpdatedDateFrom = dateFrom.value.isSame($dayjs().subtract(1, 'week'), 'day')
  const isUpdatedDateTo = dateTo.value.isSame($dayjs(), 'day')

  return !(isUpdatedDateFrom || isUpdatedDateTo)
})

const handleClickPrevWeek = () => {
  dateFrom.value = dateFrom.value.clone().subtract(1, 'week')
  dateTo.value = dateTo.value.clone().subtract(1, 'week')

  emit('update', { from: dateFrom.value.format('YYYY-MM-DD'), to: dateTo.value.format('YYYY-MM-DD')})
}
const handleClickNextWeek = () => {
  dateFrom.value = dateFrom.value.clone().add(1, 'week')
  dateTo.value = dateTo.value.clone().add(1, 'week')

  emit('update', { from: dateFrom.value.format('YYYY-MM-DD'), to: dateTo.value.format('YYYY-MM-DD')})
}
const handleClear = () => {
  dateFrom.value = $dayjs().subtract(1, 'week')
  dateTo.value = $dayjs()

  emit('update', { from: dateFrom.value.format('YYYY-MM-DD'), to: dateTo.value.format('YYYY-MM-DD')})
}
</script>

<template>
  <q-btn-group flat>
    <q-btn icon="chevron_left" @click="handleClickPrevWeek" />
    <q-btn :label="formatedDateFrom + ' - ' + formatedDateTo" />
    <q-btn v-if="canClear" icon="clear" @click="handleClear" />
    <q-btn icon="chevron_right" @click="handleClickNextWeek" />
  </q-btn-group>
</template>

<style scoped>

</style>