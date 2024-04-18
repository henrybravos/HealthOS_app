import { useEffect, useState } from 'react'

import { convertDate, generateId, getExtensionFromUri } from '@common/helpers/utils'

import { initialRacs } from '@features/racs/components/racs.const'

import { uploadFile } from '@core/services'
import { Racs, StatusRacs, TypeRacs } from '@core/types'

type ErrorRacs = Partial<Record<keyof Racs, boolean>>
type UseCreateRacsProps = {
  resetForm: boolean
  racsDB?: Racs
  handleCreateRacs: (data: { data: Racs; uuid: string }) => void
}
export const useCreateRacs = ({ resetForm, handleCreateRacs, racsDB }: UseCreateRacsProps) => {
  const [errors, setErrors] = useState<ErrorRacs>({})
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [uriEvidence, setUriEvidence] = useState<string | null>(null)
  const [racs, setRacs] = useState<Partial<Racs>>(initialRacs)
  const isClosed = racs.status === StatusRacs.CLOSED
  const modeCreate = !racs.id

  useEffect(() => {
    const racs = racsDB || initialRacs
    if (racsDB) {
      racs.status = StatusRacs.CLOSED
    }
    setRacs(racs)
    setErrors({})
    setUriEvidence(null)
  }, [resetForm, racsDB])
  const validateRacs = () => {
    const errors: ErrorRacs = {}
    if (racs.type === TypeRacs.ACT && (!racs.act || !racs.act?.id)) {
      errors.act = true
    }
    if (racs.type === TypeRacs.CONDITION && (!racs.condition || !racs.condition?.id)) {
      errors.condition = true
    }
    if (!racs.place || !racs.place?.id) {
      errors.place = true
    }
    if (!racs.company || !racs.company?.id) {
      errors.company = true
    }
    if (!racs.description) {
      errors.description = true
    }
    if (!racs.eventType || !racs.eventType?.id) {
      errors.eventType = true
    }
    if (isClosed && (!racs.controlCondition || !racs.controlCondition?.trim())) {
      errors.controlCondition = true
    }
    if (!uriEvidence) {
      errors.evidence = true
    }
    if (Object.keys(errors).length) {
      setErrors(errors)
      return false
    }
    return true
  }
  const createOrUpdateRacs = async () => {
    if (!validateRacs() || !uriEvidence) return

    const docId = racs.id || generateId()
    const fileExt = getExtensionFromUri(uriEvidence)
    const keyEvidence = isClosed ? 'closeUri' : 'openUri'
    const path = `images/racs/${docId}/${keyEvidence}.${fileExt}`
    setLoadingUpload(true)
    const imgPath = await uploadFile({
      uri: uriEvidence,
      path,
    })
    setLoadingUpload(false)
    const racsUpload = {
      ...racs,
      evidence: {
        ...racs.evidence,
        [keyEvidence]: imgPath,
      },
    } as Racs
    if (modeCreate) {
      racsUpload.createdAt = convertDate(new Date())
      racsUpload.openAt = convertDate(new Date())
    }
    if (isClosed) {
      racsUpload.closeAt = convertDate(new Date())
    }
    handleCreateRacs({
      data: racsUpload,
      uuid: docId,
    })
  }
  const onChangeValueRacs =
    (keyRacs: keyof Racs) => (selectedItem: Racs[typeof keyRacs] | null) => {
      setRacs({
        ...racs,
        [keyRacs]: selectedItem || '',
      })
      if (typeof selectedItem === 'string') {
        setErrors({
          ...errors,
          [keyRacs]: !selectedItem.trim(),
        })
      } else {
        setErrors({
          ...errors,
          [keyRacs]: false,
        })
      }
    }
  const onChangeEvidence = (image: string | null) => {
    setUriEvidence(image)
  }

  return {
    racs,
    errors,
    modeCreate,
    uriEvidence,
    loadingUpload,
    createOrUpdateRacs,
    onChangeValueRacs,
    onChangeEvidence,
  }
}
