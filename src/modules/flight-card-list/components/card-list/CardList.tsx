import { FC } from 'react'
import { FlightCard, TFlight } from 'components/index'
import styles from './CardList.module.scss'

type TCardListProps = {
  data: Array<TFlight>
  openModal: Function
}

export const CardList: FC<TCardListProps> = (props) => {
  const { data, openModal } = props

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {data.map((flight) => {
          const key = JSON.stringify(flight)
          return <FlightCard key={key} data={flight} onClick={openModal} />
        })}
      </div>
    </div>
  )
}
