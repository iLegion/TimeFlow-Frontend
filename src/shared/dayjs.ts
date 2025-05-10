import dayjs from 'dayjs'
import Duration from 'dayjs/plugin/duration'
import Utc from 'dayjs/plugin/utc'

dayjs.extend(Duration)
dayjs.extend(Utc)

export const $dayjs = dayjs
