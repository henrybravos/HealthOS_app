import { ClassificationEvent } from '@core/types'

export const COLOR_RACS_CLOSE = '#5b80e6'
export const COLOR_RACS_PENDING = '#71a720'

export const COLOR_RACS_LOW = '#fdf387'
export const COLOR_RACS_MEDIUM = '#fcb369'
export const COLOR_RACS_HIGH = '#d55858'

export const COLOR_CLASSIFICATION = {
  [ClassificationEvent.LOW]: COLOR_RACS_LOW,
  [ClassificationEvent.MEDIUM]: COLOR_RACS_MEDIUM,
  [ClassificationEvent.HIGH]: COLOR_RACS_HIGH,
}
