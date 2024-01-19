import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { getActiveClassName } from 'modules/flight-card-list/helpers/getActiveClassName'
import styles from './Modal.module.scss'

export type TModal = {
  children: ReactNode
  close: () => void
}

export const Modal: FC<TModal> = (props) => {
  const { children, close } = props
  const [isMounted, setIsMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div
      className={getActiveClassName(styles, 'modal', isMounted)}
      ref={modalRef}
    >
      {children}
    </div>
  )
}
