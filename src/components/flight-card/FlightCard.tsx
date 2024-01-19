import { FC } from 'react'
import styles from './FlightCard.module.scss'
import { ReactComponent as Airplane } from './assets/airplane.svg'
import Plane from './assets/plane.png'

export type TFlight = {
  depart_date: string
  origin: string
  destination: string
  gate: string
  return_date: string
  found_at: string
  trip_class: number
  value: number
  number_of_changes: number
  duration: number
  distance: number
  show_to_affiliates: boolean
  actual: boolean
}

type TFlightCardProps = {
  data: TFlight
  onClick: Function
}

export const FlightCard: FC<TFlightCardProps> = (props) => {
  const { data, onClick } = props

  return (
    <div className={styles.flightCard}>
      <div className={styles.flightCard__header}>
        <div className={styles.flightCard__flightNumber}>
          <span>{data.depart_date}</span>
          <span onClick={() => onClick(data)}>...</span>
        </div>
        <div className={styles.flightCard__companyName}>{data.gate}</div>
      </div>

      <div className={styles.flightCard__plane}>
        <img src={Plane} alt={'airplane'} />
      </div>

      <div className={styles.flightCard__data}>
        <div className={styles.data__departure}>
          <div className={styles.data__point}>
            <span>IATA code</span>
            <span>{data.origin}</span>
          </div>
          <div className={styles.data__timeScheduled}>
            Depart date
            <span> {data.depart_date}</span>
          </div>
        </div>
        <div className={styles.data__arrival}>
          <div className={styles.data__point}>
            <span>IATA code</span>
            <span>{data.destination}</span>
          </div>
          <div className={styles.data__timeScheduled}>
            Return date <span> {data.return_date}</span>
          </div>
        </div>
        <div className={styles.flightCard__logo}>
          <Airplane />
        </div>
      </div>
    </div>
  )
}
