import { View } from 'react-native'
import { Button, ProgressBar, Surface, Text, TextInput } from 'react-native-paper'

import { DropdownList, ImageUpload, RadioButtonGroup } from '@common/components'

import { useCreateRacs } from '@features/racs/hooks/useCreateRacs'

import {
  Company,
  EventType,
  Occupation,
  Place,
  Racs,
  StatusRacs,
  TypeRacs,
  UnsafeActCondition,
} from '@core/types'

import {
  classificationOptions,
  defaultAct,
  defaultCompany,
  defaultCondition,
  defaultEventType,
  defaultOccupation,
  defaultPlace,
  statusOptions,
  typesOptions,
} from './racs.const'

type FormRacsProps = {
  acts: UnsafeActCondition[]
  places: Place[]
  loading: boolean
  resetForm: boolean
  companies: Company[]
  eventTypes: EventType[]
  conditions: UnsafeActCondition[]
  occupations: Occupation[]
  handleCreateRacs: (racs: Racs) => void
}

const FormRacs = ({
  acts,
  places,
  loading,
  resetForm,
  companies,
  eventTypes,
  conditions,
  occupations,
  handleCreateRacs,
}: FormRacsProps) => {
  const {
    errors,
    racs,
    onChangeEvidence,
    onChangeValueRacs,
    createOrUpdateRacs,
    URI,
    loadingUpload,
  } = useCreateRacs({ resetForm, handleCreateRacs })
  return (
    <Surface style={{ gap: 8, flex: 1, margin: 8, padding: 8 }} elevation={2}>
      {loading && <ProgressBar indeterminate visible={loading} />}
      <DropdownList
        error={errors.occupation}
        keyIdRender="id"
        keyRender="name"
        defaultOptionSelected={defaultOccupation}
        label="Ocupación"
        items={occupations}
        itemSelected={racs.occupation}
        callbackSelectedItem={onChangeValueRacs('occupation')}
        autoClose
      />
      <RadioButtonGroup
        onValueChange={onChangeValueRacs('type')}
        value={racs.type || ''}
        items={typesOptions}
        error={errors.type}
        label="Tipo de reporte"
      />
      {racs.type === TypeRacs.ACT && (
        <DropdownList
          error={errors.act}
          keyIdRender="id"
          defaultOptionSelected={defaultAct}
          keyRender="name"
          label="Acto subestándar"
          items={acts}
          itemSelected={racs.act}
          callbackSelectedItem={onChangeValueRacs('act')}
          autoClose
        />
      )}
      {racs.type === TypeRacs.CONDITION && (
        <DropdownList
          keyIdRender="id"
          error={errors.condition}
          defaultOptionSelected={defaultCondition}
          keyRender="name"
          label="Condición subestándar"
          items={conditions}
          itemSelected={racs.condition}
          callbackSelectedItem={onChangeValueRacs('condition')}
          autoClose
        />
      )}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <DropdownList
            keyIdRender="id"
            error={errors.place}
            defaultOptionSelected={defaultPlace}
            keyRender="name"
            label="Lugar"
            items={places}
            itemSelected={racs.place}
            callbackSelectedItem={onChangeValueRacs('place')}
            autoClose
          />
        </View>
        <View style={{ flex: 1.25 }}>
          <DropdownList
            keyIdRender="id"
            error={errors.company}
            defaultOptionSelected={defaultCompany}
            keyRender="name"
            label="Empresa reportada"
            items={companies}
            itemSelected={racs.company}
            callbackSelectedItem={onChangeValueRacs('company')}
            autoClose
          />
        </View>
      </View>
      <TextInput
        onChangeText={onChangeValueRacs('description')}
        value={racs.description || ''}
        mode="outlined"
        label="Descripción breve del evento"
        multiline
        error={errors.description}
      />
      <RadioButtonGroup
        onValueChange={onChangeValueRacs('classification')}
        value={racs.classification || ''}
        items={classificationOptions}
        label="Clasificación"
      />
      <DropdownList
        keyIdRender="id"
        error={errors.eventType}
        defaultOptionSelected={defaultEventType}
        keyRender="name"
        label="Tipo de evento"
        items={eventTypes}
        itemSelected={racs.eventType}
        callbackSelectedItem={onChangeValueRacs('eventType')}
        autoClose
      />

      <RadioButtonGroup
        onValueChange={onChangeValueRacs('status')}
        value={racs.status || ''}
        items={statusOptions}
        label="Cerré mi proceso"
      />
      {racs.status === StatusRacs.CLOSED && (
        <TextInput
          error={errors.controlCondition}
          onChangeText={onChangeValueRacs('controlCondition')}
          value={racs.controlCondition || ''}
          mode="outlined"
          label="¿Cómo se controló el acto/condición subestándar?"
          multiline
        />
      )}
      <ImageUpload
        callbackSelectImage={onChangeEvidence}
        description={'Evidencia'}
        loading={loadingUpload}
        error={errors.evidence}
        uri={URI}
      />
      <Button mode="contained" onPress={createOrUpdateRacs} disabled={loading || loadingUpload}>
        GUARDAR
      </Button>
    </Surface>
  )
}
export default FormRacs
