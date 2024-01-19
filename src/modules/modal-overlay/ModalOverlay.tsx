import { Modal } from 'UI/modal'
import { Overlay } from 'UI/overlay'
import { FlightCard, TFlight } from 'components'
import { FC } from 'react'
import styles from './ModalOverlay.module.scss'

type TModalOverlay = {
  data: TFlight | null
  closeModal: Function
}

const flightClass = ['Economy', 'Business', 'First']

const ModalOverlay: FC<TModalOverlay> = (props) => {
  const { data, closeModal } = props

  if (!data) {
    return <></>
  }

  function handleCloseModal() {
    closeModal(null)
  }

  return (
    <div className={styles.container}>
      <Modal close={handleCloseModal}>
        <FlightCard data={data} onClick={handleCloseModal} />
        <div className={styles.data}>
          <div className={styles.data__title}>Flight data</div>
          <div className={styles.data__class}>
            Trip class <span>{flightClass[data.trip_class]}</span>
          </div>
          <div className={styles.data__cost}>
            Cost <span>{data.value} rub</span>
          </div>

          <div className={styles.data__changes}>
            Number of changes <span>{data.number_of_changes}</span>
          </div>

          <div className={styles.data__duration}>
            Duration <span>{Math.round(data.duration / 60)} min</span>
          </div>

          <div className={styles.data__distance}>
            Distance <span>{data.distance} km</span>
          </div>
        </div>
      </Modal>
      <Overlay onClick={handleCloseModal} />
    </div>
  )
}

export default ModalOverlay

// "depart_date": "2024-02-13",!
// "origin": "TOF",!
// "destination": "ASF",!
// "gate": "Kupi.com",!
// "return_date": "2024-02-15",!
// "found_at": "2024-01-19T06:36:56",
// "trip_class": 0,!
// "value": 29540,!
// "number_of_changes": 2,!
// "duration": 2180,
// "distance": 2761,
// "show_to_affiliates": true,
// "actual": true
