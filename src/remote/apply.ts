import { store } from './firebase'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { ApplyValues } from '@/models/apply'

export const applyCard = async (applyValues: ApplyValues) => {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export const updateApplyCard = async ({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) => {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs

  updateDoc(applied.ref, applyValues)
}

export const getAppliedCard = async ({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) => {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const [applied] = snapshot.docs

  return applied.data() as ApplyValues
}
