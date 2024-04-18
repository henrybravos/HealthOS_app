import { ClassificationEvent, Racs, StatusRacs, TypeRacs } from '@core/types'

export const defaultOccupation = { id: '', name: 'Seleccionar ocupación' }
export const defaultPlace = { id: '', name: 'Seleccionar lugar' }
export const defaultAct = { id: '', name: 'Seleccionar un acto subestandar' }
export const defaultCondition = { id: '', name: 'Seleccionar una condición subestandar' }
export const defaultCompany = { id: '', name: 'Selec. empresa reportada' }
export const defaultEventType = { id: '', name: 'Seleccionar un tipo de evento' }
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
