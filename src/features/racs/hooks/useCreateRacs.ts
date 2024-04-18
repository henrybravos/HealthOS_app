import { useEffect, useState } from 'react'

import { convertDate } from '@common/helpers/utils'

import { initialRacs } from '@features/racs/components/racs.const'

import { uploadFile } from '@core/services'
import { Racs, StatusRacs, TypeRacs } from '@core/types'

type ErrorRacs = Partial<Record<keyof Racs, boolean>>
type UseCreateRacsProps = {
  resetForm: boolean
  handleCreateRacs: (racs: Racs) => void
}
export const useCreateRacs = ({ resetForm, handleCreateRacs }: UseCreateRacsProps) => {
  const [errors, setErrors] = useState<ErrorRacs>({})
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [racs, setRacs] = useState<Partial<Racs>>(initialRacs)

  useEffect(() => {
    setRacs(initialRacs)
    setErrors({})
  }, [resetForm])

  const createOrUpdateRacs = async () => {
    const errors: ErrorRacs = {}
    const isClosed = racs.status === StatusRacs.CLOSED
    if (!racs.occupation || !racs.occupation?.id) {
      errors.occupation = true
    }
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
    if (isClosed && !racs.evidence?.closeUri) {
      errors.evidence = true
    }
    if (racs.status === StatusRacs.PENDING && !racs.evidence?.openUri) {
      errors.evidence = true
    }
    const uri = isClosed ? racs.evidence?.closeUri : racs.evidence?.openUri

    if (!uri) {
      errors.evidence = true
    }
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    const parts = uri?.split('/') || []
    const fileNameWithExtension = parts[parts.length - 1]
    setLoadingUpload(true)
    const imgPath = await uploadFile({
      uri: uri!,
      path: `images/racs/${fileNameWithExtension}`,
    })
    setLoadingUpload(false)
    const keyEvidence = isClosed ? 'closeUri' : 'openUri'
    const racsUpload = {
      ...racs,
      evidence: {
        [keyEvidence]: imgPath,
      },
      createdAt: convertDate(new Date()),
      openAt: convertDate(new Date()),
    } as Racs
    if (isClosed) {
      racsUpload.closeAt = convertDate(new Date())
    }
    handleCreateRacs(racsUpload)
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
    const evidenceClose = { closeUri: image || undefined }
    const evidenceOpen = { openUri: image || undefined }
    const isClosed = racs.status === StatusRacs.CLOSED
    const evidence = isClosed ? evidenceClose : evidenceOpen
    onChangeValueRacs('evidence')({
      ...evidence,
    })
  }
  const URI = racs.status === StatusRacs.CLOSED ? racs.evidence?.closeUri : racs.evidence?.openUri
  return {
    racs,
    errors,
    createOrUpdateRacs,
    onChangeValueRacs,
    onChangeEvidence,
    URI,
    loadingUpload,
  }
}
