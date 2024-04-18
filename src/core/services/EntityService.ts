import {
  DocumentData,
  FieldPath,
  QuerySnapshot,
  WhereFilterOp,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import { appFirebase } from '@common/config'
import { COLLECTIONS } from '@common/const/collections'

import { Company, EventType, Occupation, Place, Racs, UnsafeActCondition, User } from '@core/types'

global.Buffer = require('buffer').Buffer

const db = getFirestore(appFirebase)
const storage = getStorage(appFirebase)
const convertToEntity = <T>(querySnapshot: QuerySnapshot<DocumentData, DocumentData>): T[] => {
  const documents: T[] = []
  querySnapshot.forEach((doc) => {
    const row = doc.data()
    documents.push({
      id: doc.id,
      ...row,
    } as T)
  })
  return documents || []
}
export const uploadFile = async ({ path, uri }: { uri: string; path: string }): Promise<string> => {
  const storageRef = ref(storage, path)
  const response = await fetch(uri)
  const blob = await response.blob()
  await uploadBytes(storageRef, blob)
  const url = await getDownloadURL(storageRef)
  console.log('Uploaded a blob or file!', url)
  return url
}
const addDocument = async <T>(collectionName: string, data: T): Promise<T> => {
  const docRef = await addDoc(collection(db, collectionName), data as unknown)
  return {
    id: docRef.id,
    ...data,
  }
}
const getAllDocuments = async <T>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  return convertToEntity<T>(querySnapshot)
}

const getDocumentsByQuery = async <T>(
  collectionName: string,
  queries: { fieldPath: string | FieldPath; op: WhereFilterOp; value: unknown }[],
): Promise<T[]> => {
  const wheres = queries.map((q) => where(q.fieldPath, q.op, q.value))
  const q = query(collection(db, collectionName), ...wheres)
  const querySnapshot = await getDocs(q)
  return convertToEntity<T>(querySnapshot)
}
const EntityService = {
  getAllDocuments,
  getDocumentsByQuery,
  addDocument,
}
const RacsService = {
  getRacsByUser: async (user: User) => {
    return EntityService.getDocumentsByQuery<Racs>(COLLECTIONS.racs, [
      {
        fieldPath: 'user.id',
        op: '==',
        value: user.id,
      },
    ])
  },
  addDocument: async (data: Racs) => {
    return EntityService.addDocument(COLLECTIONS.racs, data)
  },
}
const OccupationService = {
  getAllOccupations: async (): Promise<Occupation[]> => {
    return EntityService.getAllDocuments<Occupation>(COLLECTIONS.occupations)
  },
}

const CompanyService = {
  getAllCompanies: async (): Promise<Company[]> => {
    return EntityService.getAllDocuments<Company>(COLLECTIONS.companies)
  },
}
const PlaceService = {
  getAllPlaces: async () => {
    return EntityService.getAllDocuments<Place>(COLLECTIONS.places)
  },
}
const ActService = {
  getAllActs: async () => {
    return EntityService.getAllDocuments<UnsafeActCondition>(COLLECTIONS.unsafeActs)
  },
}
const ConditionService = {
  getAllConditions: async () => {
    return EntityService.getAllDocuments<UnsafeActCondition>(COLLECTIONS.unsafeConditions)
  },
}
const EventTypeService = {
  getAllEventTypes: async () => {
    return EntityService.getAllDocuments<EventType>(COLLECTIONS.eventTypes)
  },
}
export {
  EntityService,
  OccupationService,
  CompanyService,
  ActService,
  ConditionService,
  PlaceService,
  EventTypeService,
  RacsService,
}
