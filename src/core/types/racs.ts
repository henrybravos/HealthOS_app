import { Timestamp } from 'firebase/firestore'

import {
  ClassificationEvent,
  Company,
  EventType,
  Occupation,
  Place,
  UnsafeActCondition,
  User,
} from '@core/types'

export enum StatusRacs {
  CLOSED = 'CERRADO',
  PENDING = 'PENDIENTE',
}
export enum TypeRacs {
  ACT = 'ACTO SUB.',
  CONDITION = 'CONDICIÓN SUBÉSTANTAR',
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
  user: Partial<Omit<User, 'auth'>>
  type: TypeRacs
  place: Place
  company: Company
  evidence: EvidenceRacs
  eventType: EventType
  condition?: UnsafeActCondition
  occupation: Occupation
  description: string
  classification: ClassificationEvent
  controlCondition: string
  status: StatusRacs
}
