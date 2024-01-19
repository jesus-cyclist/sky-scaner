import { Checkbox } from 'UI'
import { TFilterData } from 'hooks'
import { useClickOutSide } from 'hooks/useClickOutside'
import { FC, useRef, useState } from 'react'
import { ReactComponent as Angle } from '../../assets/svg/angle.svg'
import { getActiveClassName } from '../../helpers/getActiveClassName'
import styles from './ListFilter.module.scss'

type TCardListProps = {
  data: TFilterData
  changeFilterGate: Function
  filterDepartDate: Array<string>
  filterGate: Array<string>
  changeFilterDepartDate: Function
}

export const ListFilter: FC<TCardListProps> = (props) => {
  const {
    data,
    changeFilterGate,
    filterDepartDate,
    changeFilterDepartDate,
    filterGate,
  } = props

  const [isDepartDateOpen, setIsDepartDateOpen] = useState(false)
  const [isGateOpen, setIsGateOpen] = useState(false)
  const departDayRef = useRef(null)
  const gateRef = useRef(null)
  useClickOutSide({
    ref: departDayRef,
    callback: () => setIsDepartDateOpen(false),
  })
  useClickOutSide({ ref: gateRef, callback: () => setIsGateOpen(false) })

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div
          className={getActiveClassName(
            styles,
            'filter__title',
            isDepartDateOpen
          )}
          onClick={() => setIsDepartDateOpen((prev) => !prev)}
          ref={departDayRef}
        >
          <span>Depart date</span>
          <Angle />
        </div>

        <div
          className={getActiveClassName(
            styles,
            'filter__list',
            isDepartDateOpen
          )}
        >
          {data.departDate.map((departDate) => (
            <Checkbox
              key={departDate.key}
              id={`${departDate.key}`}
              toggle={changeFilterDepartDate}
              title={`${departDate.key} (${departDate.value})`}
              isActive={filterDepartDate.includes(departDate.key)}
            />
          ))}
        </div>
      </div>
      <div className={styles.filter}>
        <div
          className={getActiveClassName(styles, 'filter__title', isGateOpen)}
          onClick={() => setIsGateOpen((prev) => !prev)}
          ref={gateRef}
        >
          <span>Airline</span>
          <Angle />
        </div>
        <div className={getActiveClassName(styles, 'filter__list', isGateOpen)}>
          {data.gate.map((gate) => (
            <Checkbox
              key={gate.key}
              id={`${gate.key}`}
              toggle={changeFilterGate}
              title={`${gate.key} (${gate.value})`}
              isActive={filterGate.includes(`${gate.key}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
