import { FC } from 'react'
import styles from './Overlay.module.scss'

type TOverLay = {
  onClick: () => void
}

export const Overlay: FC<TOverLay> = (props) => {
  const { onClick } = props

  return <div className={styles.overlay} onClick={() => onClick()}></div>
}
