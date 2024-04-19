import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Snackbar } from 'react-native-paper'

import { useFetchApi } from '@common/hooks'

import {
  ActService,
  CompanyService,
  ConditionService,
  EventTypeService,
  PlaceService,
  RacsService,
} from '@core/services'

import { StackNavigation } from '@navigation/navigation.types'

import { FormRacs } from './components/form'

const CreateRacsManagement = () => {
  const navigation = useNavigation<StackNavigation>()
  const state = navigation.getState()
  const racs = state.routes[state.index].params

  const [loadingCompanies, companies, fetchGetCompanies] = useFetchApi(
    CompanyService.getAllCompanies,
  )
  const [loadingPlaces, places, fetchGetPlaces] = useFetchApi(PlaceService.getAllPlaces)
  const [loadingEvents, eventTypes, fetchGetEvents] = useFetchApi(EventTypeService.getAllEventTypes)
  const [loadingActs, acts, fetchGetActs] = useFetchApi(ActService.getAllActs)
  const [loadingConditions, conditions, fetchGetConditions] = useFetchApi(
    ConditionService.getAllConditions,
  )
  const [loadingCreate, racsResponse, fetchCreateRacs, errorCreate, resetCreateData] = useFetchApi(
    RacsService.setDocument,
  )

  useEffect(() => {
    fetchGetCompanies()
    fetchGetPlaces()
    fetchGetEvents()
    fetchGetConditions()
    fetchGetActs()
  }, [])
  useEffect(() => {
    if (racsResponse?.id) {
      navigation.navigate('ListRacs' as never)
    }
  }, [racsResponse])
  const loadingForm =
    loadingCompanies ||
    loadingPlaces ||
    loadingEvents ||
    loadingActs ||
    loadingConditions ||
    loadingCreate
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      automaticallyAdjustContentInsets
      automaticallyAdjustsScrollIndicatorInsets
    >
      <FormRacs
        racs={racs}
        acts={acts}
        loading={loadingForm}
        resetForm={loadingCreate}
        places={places || []}
        companies={companies || []}
        conditions={conditions || []}
        eventTypes={eventTypes || []}
        handleCreateRacs={fetchCreateRacs}
      />
      {racsResponse?.id && (
        <Snackbar style={{ position: 'absolute', bottom: 0 }} visible onDismiss={resetCreateData}>
          Ejecutado correctamente
        </Snackbar>
      )}
    </ScrollView>
  )
}
export default CreateRacsManagement
