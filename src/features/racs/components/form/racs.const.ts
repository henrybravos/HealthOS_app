import { ClassificationEvent, Racs, StatusRacs, TypeRacs } from '@core/types'

export const defaultOccupation = { id: '', name: '-------' }
export const defaultPlace = { id: '', name: '-------' }
export const defaultAct = { id: '', name: '-------' }
export const defaultCondition = { id: '', name: '-------' }
export const defaultCompany = { id: '', name: '-------' }
export const defaultEventType = { id: '', name: '-------' }
export const classificationOptions = [
  {
    label: ClassificationEvent.HIGH,
    value: ClassificationEvent.HIGH,
  },
  {
    label: ClassificationEvent.MEDIUM,
    value: ClassificationEvent.MEDIUM,
  },
  {
    label: ClassificationEvent.LOW,
    value: ClassificationEvent.LOW,
  },
]
export const statusOptions = [
  {
    label: StatusRacs.CLOSED,
    value: StatusRacs.CLOSED,
  },
  {
    label: StatusRacs.PENDING,
    value: StatusRacs.PENDING,
  },
]
export const typesOptions = [
  {
    label: TypeRacs.ACT,
    value: TypeRacs.ACT,
  },
  {
    label: TypeRacs.CONDITION,
    value: TypeRacs.CONDITION,
  },
  {
    label: TypeRacs.INCIDENT,
    value: TypeRacs.INCIDENT,
  },
  {
    label: TypeRacs.GOOD_PRACTICE,
    value: TypeRacs.GOOD_PRACTICE,
  },
]
export const initialRacs: Partial<Racs> = {
  status: StatusRacs.PENDING,
  classification: ClassificationEvent.LOW,
  type: TypeRacs.GOOD_PRACTICE,
  user: {
    id: '1',
    email: 'hbravos@gmail.com',
    name: 'Henry',
    surname: 'Bravo',
  },
}
