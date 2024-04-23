import { COLLECTIONS } from '@common/const/collections'
import {
  COMPANIES,
  EVENTS,
  OCCUPATIONS,
  PLACES,
  UNSAFE_ACTS,
  UNSAFE_CONDITIONS,
} from '@common/const/defaultValues'

import { EntityService } from '@core/services/EntityService'

export const dataInitialDefault = {
  [COLLECTIONS.companies]: COMPANIES,
  [COLLECTIONS.eventTypes]: EVENTS,
  [COLLECTIONS.occupations]: OCCUPATIONS,
  [COLLECTIONS.places]: PLACES,
  [COLLECTIONS.unsafeActs]: UNSAFE_ACTS,
  [COLLECTIONS.unsafeConditions]: UNSAFE_CONDITIONS,
}

export const initCollections = async () => {
  const collections = [
    COLLECTIONS.occupations,
    COLLECTIONS.companies,
    COLLECTIONS.eventTypes,
    COLLECTIONS.places,
    COLLECTIONS.unsafeActs,
    COLLECTIONS.unsafeConditions,
  ]
  for (const collectionName of collections) {
    const data = dataInitialDefault[collectionName]
    const dataCreate = await EntityService.addManyDocuments(collectionName, data as any)
    console.log(dataCreate, collectionName)
  }
}
