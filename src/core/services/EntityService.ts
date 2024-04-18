import {
  DocumentData,
  FieldPath,
  QuerySnapshot,
  WhereFilterOp,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
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
  console.log('Uri', uri)
  try {
    const response = await fetch(uri)
    const blob = await response.blob()
    console.log('blob', blob.size)
    await uploadBytes(storageRef, blob)
    const url = await getDownloadURL(storageRef)
    console.log('Uploaded a blob or file!', url)
    return url
  } catch (error) {
    console.error('Error uploading file', error)
    return ''
  }
}
const addDocument = async <T>(collectionName: string, data: T): Promise<T> => {
  const docRef = await addDoc(collection(db, collectionName), data as unknown)
  return {
    id: docRef.id,
    ...data,
  }
}
const setDocument = async <T>(collectionName: string, data: T, uuid: string): Promise<T> => {
  await setDoc(doc(db, collectionName, uuid), data as unknown)
  return {
    id: uuid,
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
  setDocument,
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
  setDocument: async ({ data, uuid }: { data: Racs; uuid: string }) => {
    return EntityService.setDocument(COLLECTIONS.racs, data, uuid)
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
