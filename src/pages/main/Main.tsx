import React, { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import { CardList } from 'modules'
import { bd } from 'modules/flight-card-list/helpers/bd'
import { ListFilter } from 'modules'
import axios from 'axios'
import { useFiltredFlights } from 'hooks'
import ModalOverlay from 'modules/modal-overlay/ModalOverlay'
import { TFlight } from 'components'
import { useFetching } from 'hooks/useFetching'
import { Loader } from 'UI/loader'

export const Main = () => {
  const [flights, setFlight] = useState<Array<TFlight>>([])
  const [filterGate, setFilterGate] = useState<Array<any>>([])
  const [filterDepartDay, setFilterDepartDay] = useState<Array<any>>([])
  const { filterOptions, filtredFlights } = useFiltredFlights(
    flights,
    filterGate,
    filterDepartDay,
    setFilterGate,
    setFilterDepartDay
  )
  const [isModalActive, setIsModalActive] = useState<TFlight | null>(null)

  const [fetching, isLoading, error] = useFetching(async () => {
    await axios
      .get('/v2/prices/latest', {
        params: {
          currency: 'rub',
          token: 'f00a222924dc37ebb550ab2f9ae92666',
        },
      })
      .then((response) => {
        setFlight(response.data.data)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  })

  useEffect(() => {
    fetching()
  }, [])

  const changeFilterGate = (query: any) => {
    filterGate.includes(query)
      ? setFilterGate((prev) => [...prev].filter((item) => item !== query))
      : setFilterGate((prev) => [...prev, query])
  }

  const changeFilterDepartDay = (query: any) => {
    filterDepartDay.includes(query)
      ? setFilterDepartDay((prev) => [...prev].filter((item) => item !== query))
      : setFilterDepartDay((prev) => [...prev, query])
  }

  const openModal = (data: TFlight) => {
    setIsModalActive(data)
  }

  if (isLoading || error) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <ListFilter
        data={filterOptions}
        changeFilterGate={changeFilterGate}
        changeFilterDepartDate={changeFilterDepartDay}
        filterDepartDate={filterDepartDay}
        filterGate={filterGate}
      />
      <CardList data={filtredFlights} openModal={openModal} />
      <ModalOverlay data={isModalActive} closeModal={setIsModalActive} />
    </div>
  )
}
