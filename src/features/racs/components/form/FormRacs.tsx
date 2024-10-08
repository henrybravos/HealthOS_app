import { View } from 'react-native'
import { Button, ProgressBar, Surface, TextInput, useTheme } from 'react-native-paper'

import { DropdownList, ImageUpload, RadioButtonGroup } from '@common/components'

import { useCreateRacs } from '@features/racs/hooks/useCreateRacs'

import {
  Company,
  EventType,
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
  defaultPlace,
  statusOptions,
  typesOptions,
} from './racs.const'

type FormRacsProps = {
  racs?: Racs
  acts: UnsafeActCondition[]
  places: Place[]
  loading: boolean
  resetForm: boolean
  companies: Company[]
  eventTypes: EventType[]
  conditions: UnsafeActCondition[]
  handleCreateRacs: (data: { data: Racs; uuid: string }) => void
}

const FormRacs = ({
  acts,
  places,
  loading,
  resetForm,
  companies,
  eventTypes,
  conditions,
  handleCreateRacs,
  racs,
}: FormRacsProps) => {
  const ctxForm = useCreateRacs({ resetForm, handleCreateRacs, racsDB: racs })
  const theme = useTheme()
  return (
    <Surface
      style={{
        gap: 8,
        flex: 1,
        margin: 4,
        borderRadius: 4,
        padding: 8,
        backgroundColor: theme.colors.surface,
      }}
      elevation={2}
    >
      {loading && <ProgressBar indeterminate visible={loading} />}

      <RadioButtonGroup
        onValueChange={ctxForm.onChangeValueRacs('type')}
        value={ctxForm.racs.type || ''}
        items={typesOptions}
        error={ctxForm.errors.type}
        label="Tipo de reporte"
      />
      {ctxForm.racs.type === TypeRacs.ACT && (
        <DropdownList
          error={ctxForm.errors.act}
          keyIdRender="id"
          defaultOptionSelected={defaultAct}
          keyRender="name"
          label="Acto subestándar"
          items={acts}
          itemSelected={ctxForm.racs.act}
          callbackSelectedItem={ctxForm.onChangeValueRacs('act')}
          autoClose
        />
      )}
      {ctxForm.racs.type === TypeRacs.CONDITION && (
        <DropdownList
          keyIdRender="id"
          error={ctxForm.errors.condition}
          defaultOptionSelected={defaultCondition}
          keyRender="name"
          label="Condición subestándar"
          items={conditions}
          itemSelected={ctxForm.racs.condition}
          callbackSelectedItem={ctxForm.onChangeValueRacs('condition')}
          autoClose
        />
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: '50%' }}>
          <DropdownList
            keyIdRender="id"
            error={ctxForm.errors.place}
            defaultOptionSelected={defaultPlace}
            keyRender="name"
            label="Lugar"
            items={places}
            itemSelected={ctxForm.racs.place}
            callbackSelectedItem={ctxForm.onChangeValueRacs('place')}
            autoClose
          />
        </View>
        {ctxForm.racs.place?.id === 'OTHER' && (
          <View style={{ width: '50%' }}>
            <TextInput
              onChangeText={ctxForm.onChangeValueRacs('otherPlace')}
              value={ctxForm.racs.otherPlace || ''}
              mode="outlined"
              label="Ingresa lugar"
              multiline
              dense
              error={ctxForm.errors.otherPlace}
            />
          </View>
        )}
        <View style={{ width: '50%' }}>
          <DropdownList
            keyIdRender="id"
            error={ctxForm.errors.company}
            defaultOptionSelected={defaultCompany}
            keyRender="name"
            label="Empresa reportada"
            items={companies}
            itemSelected={ctxForm.racs.company}
            callbackSelectedItem={ctxForm.onChangeValueRacs('company')}
            autoClose
          />
        </View>
        {ctxForm.racs.company?.id === 'OTHER' && (
          <View style={{ width: '50%' }}>
            <TextInput
              onChangeText={ctxForm.onChangeValueRacs('otherCompany')}
              value={ctxForm.racs.otherCompany || ''}
              mode="outlined"
              label="Ingresa empresa"
              multiline
              dense
              error={ctxForm.errors.otherCompany}
            />
          </View>
        )}
      </View>
      <TextInput
        onChangeText={ctxForm.onChangeValueRacs('description')}
        value={ctxForm.racs.description || ''}
        mode="outlined"
        label="Descripción breve del evento"
        multiline
        dense
        error={ctxForm.errors.description}
      />
      <RadioButtonGroup
        onValueChange={ctxForm.onChangeValueRacs('classification')}
        value={ctxForm.racs.classification || ''}
        items={classificationOptions}
        label="Clasificación"
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <DropdownList
            keyIdRender="id"
            error={ctxForm.errors.eventType}
            defaultOptionSelected={defaultEventType}
            keyRender="name"
            label="Tipo de evento"
            items={eventTypes}
            itemSelected={ctxForm.racs.eventType}
            callbackSelectedItem={ctxForm.onChangeValueRacs('eventType')}
            autoClose
          />
        </View>
        {ctxForm.racs.eventType?.id === 'OTHER' && (
          <View style={{ flex: 1 }}>
            <TextInput
              onChangeText={ctxForm.onChangeValueRacs('otherEventType')}
              value={ctxForm.racs.otherEventType || ''}
              mode="outlined"
              label="Ingrese tipo"
              multiline
              dense
              error={ctxForm.errors.otherEventType}
            />
          </View>
        )}
      </View>

      <RadioButtonGroup
        onValueChange={ctxForm.onChangeValueRacs('status')}
        value={ctxForm.racs.status || ''}
        items={statusOptions}
        label="Cerré mi proceso"
        disabled={!ctxForm.modeCreate}
      />
      {ctxForm.racs.status === StatusRacs.CLOSED && (
        <TextInput
          error={ctxForm.errors.controlCondition}
          onChangeText={ctxForm.onChangeValueRacs('controlCondition')}
          value={ctxForm.racs.controlCondition || ''}
          mode="outlined"
          label="¿Cómo se controló el acto/condición subestándar?"
          multiline
        />
      )}
      <ImageUpload
        callbackSelectImage={ctxForm.onChangeEvidence}
        description={'Evidencia'}
        loading={ctxForm.loadingUpload}
        error={ctxForm.errors.evidence}
        uri={ctxForm.uriEvidence || undefined}
      />
      <Button
        mode="contained"
        onPress={ctxForm.createOrUpdateRacs}
        disabled={loading || ctxForm.loadingUpload}
      >
        GUARDAR
      </Button>
    </Surface>
  )
}
export default FormRacs
