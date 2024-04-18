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
  OccupationService,
  PlaceService,
  RacsService,
} from '@core/services'

import { FormRacs } from './components'

const CreateRacsManagement = () => {
  const navigation = useNavigation()
  const [loadingOccupations, occupations, fetchGetOccupations] = useFetchApi(
    OccupationService.getAllOccupations,
  )
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
    RacsService.addDocument,
  )
  useEffect(() => {
    fetchGetOccupations()
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
    loadingOccupations ||
    loadingCompanies ||
    loadingPlaces ||
    loadingEvents ||
    loadingActs ||
    loadingConditions ||
    loadingCreate
  return (
    <ScrollView>
      <FormRacs
        acts={acts}
        loading={loadingForm}
        resetForm={loadingCreate}
        places={places || []}
        companies={companies || []}
        conditions={conditions || []}
        eventTypes={eventTypes || []}
        occupations={occupations || []}
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
