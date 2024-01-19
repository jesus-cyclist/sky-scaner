import { useMemo } from 'react'
import { TFlight } from '../components'

export type TFilter = {
  departDate: {
    [key: string]: number
  }
  gate: { [key: string]: number }
}

type TData = {
  key: string
  value: number
}

export type TFilterData = {
  departDate: Array<TData>
  gate: Array<TData>
}

const useFilter = (
  flights: Array<TFlight>,
  setFilterGate: Function,
  setFilterDepartDay: Function
): TFilterData => {
  const filter = useMemo((): any => {
    const departDayState: Array<string> = []
    const gateState: Array<string> = []
    const filterData = flights.reduce(
      (acc: TFilter, flight: TFlight) => {
        const departDate = flight.depart_date
        departDayState.push(departDate)
        acc.departDate[departDate] = (acc.departDate[departDate] || 0) + 1
        const gate = flight.gate
        gateState.push(gate)
        acc.gate[gate] = (acc.gate[gate] || 0) + 1
        return acc
      },
      { departDate: {}, gate: {} }
    )
    setFilterGate(gateState)
    setFilterDepartDay(departDayState)
    const departDate: Array<TData> = Object.entries(filterData.departDate)
      .map(([key, value]) => ({
        key,
        value,
        active: true,
      }))

      .sort((a, b) => b.value - a.value)
    const gate: Array<TData> = Object.entries(filterData.gate)
      .map(([key, value]) => ({
        key,
        value,
        active: true,
      }))
      .sort((a, b) => b.value - a.value)
    return {
      departDate,
      gate,
    }
  }, [flights, setFilterGate, setFilterDepartDay])

  return filter
}

const useFiltredByDepartDate = (
  flights: Array<TFlight>,
  filterClass: Array<string>
) => {
  const filtred = useMemo(() => {
    if (!filterClass.length) {
      return flights
    }

    return flights.filter(
      (flight) => flight.depart_date && filterClass.includes(flight.depart_date)
    )
  }, [filterClass, flights])

  return filtred
}

export const useFiltredFlights = (
  flights: Array<TFlight>,
  filterGate: Array<string>,
  filterDepartDay: Array<string>,
  setFilterGate: Function,
  setFilterDepartDay: Function
) => {
  const filterOptions = useFilter(flights, setFilterGate, setFilterDepartDay)

  const filtredByClass = useFiltredByDepartDate(flights, filterDepartDay)

  const filtredFlightByGate = useMemo(() => {
    if (!filterGate.length) {
      return filtredByClass
    }
    return filtredByClass.filter(
      (flight) => flight.gate && filterGate.includes(flight.gate)
    )
  }, [filterGate, filtredByClass])

  return { filterOptions: filterOptions, filtredFlights: filtredFlightByGate }
}
