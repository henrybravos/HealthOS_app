import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  DocumentData,
  FieldPath,
  QuerySnapshot,
  WhereFilterOp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { auth, db, storage } from '@common/config'
import { COLLECTIONS } from '@common/const/collections'
import { generateId } from '@common/helpers'

import {
  Company,
  EventType,
  Occupation,
  Place,
  Racs,
  UnsafeActCondition,
  UserInfo,
} from '@core/types'

export type WhereQuery = { fieldPath: string | FieldPath; op: WhereFilterOp; value: unknown }

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
  const storageRef = ref(storage!, path)
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
  const docRef = await addDoc(collection(db!, collectionName), data as unknown)
  return {
    id: docRef.id,
    ...data,
  }
}
const addManyDocuments = async <T extends { id?: string }>(
  collectionName: string,
  data: Partial<T>[],
): Promise<Partial<T>[]> => {
  const batch = writeBatch(db!)
  data.forEach((d) => {
    const id = generateId()
    d.id = id
    const nycRef = doc(db!, collectionName, id)
    batch.set(nycRef, d as unknown)
  })
  await batch.commit()
  return data
}

const setDocument = async <T>(collectionName: string, data: T, uuid: string): Promise<T> => {
  await setDoc(doc(db!, collectionName, uuid), data as unknown)
  return {
    id: uuid,
    ...data,
  }
}
const getAllDocuments = async <T>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db!, collectionName))
  return convertToEntity<T>(querySnapshot)
}
const getDocumentById = async <T>(collectionName: string, uuid: string): Promise<T | null> => {
  const docRef = doc(db!, collectionName, uuid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as T
  } else {
    return null
  }
}
const getDocumentsByQuery = async <T>(
  collectionName: string,
  queries: WhereQuery[],
  orderByField: string | undefined,
): Promise<T[]> => {
  const wheres = queries.map((q) => where(q.fieldPath, q.op, q.value))
  let q = query(collection(db!, collectionName), ...wheres)
  if (orderByField) {
    q = query(collection(db!, collectionName), ...wheres, orderBy('createdAt', 'desc'))
  }
  const querySnapshot = await getDocs(q)
  return convertToEntity<T>(querySnapshot)
}
const EntityService = {
  getAllDocuments,
  getDocumentsByQuery,
  getDocumentById,
  addDocument,
  addManyDocuments,
  setDocument,
}
const RacsService = {
  getRacsByUser: async (user: UserInfo) => {
    if (!user || !user.id) {
      throw new Error('User not found')
    }
    return EntityService.getDocumentsByQuery<Racs>(
      COLLECTIONS.racs,
      [
        {
          fieldPath: 'user.id',
          op: '==',
          value: user.id,
        },
      ],
      'createdAt',
    )
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
const AuthService = {
  signIn: async ({ email, password }: { email: string; password: string }) => {
    if (!auth) return
    const responseAuth = await signInWithEmailAndPassword(auth, email, password)
    return responseAuth
  },
  signOut: async () => {
    if (!auth) return
    await signOut(auth)
    return true
  },
  getExtraData: async ({ authId }: { authId: string }) => {
    const where: WhereQuery[] = [
      {
        fieldPath: 'authId',
        op: '==',
        value: authId,
      },
    ]
    const extra = await EntityService.getDocumentsByQuery<UserInfo>(
      COLLECTIONS.usersExtra,
      where,
      undefined,
    )
    if (extra.length === 0) return null
    return extra[0]
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
  AuthService,
}
