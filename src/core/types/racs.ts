import { Timestamp } from 'firebase/firestore'

import {
  ClassificationEvent,
  Company,
  EventType,
  Place,
  UnsafeActCondition,
  UserInfo,
} from '@core/types'

export enum StatusRacs {
  CLOSED = 'CERRADO',
  PENDING = 'PENDIENTE',
}
export enum TypeRacs {
  ACT = 'ACTO SUBÉSTANDAR',
  CONDITION = 'CONDICIÓN SUBÉSTANDAR',
  INCIDENT = 'INCIDENTE',
  GOOD_PRACTICE = 'BUENA PRÁCTICA',
}
export type EvidenceRacs = {
  openUri?: string
  closeUri?: string
}
export type Racs = {
  id: string
  createdAt: Timestamp
  openAt?: Timestamp
  closeAt?: Timestamp
  act?: UnsafeActCondition
  user: UserInfo
  type: TypeRacs
  place: Place
  company: Company
  evidence: EvidenceRacs
  eventType: EventType
  condition?: UnsafeActCondition
  description: string
  classification: ClassificationEvent
  controlCondition: string
  status: StatusRacs
}
