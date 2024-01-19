import { FC } from 'react'
import styles from './CheckBox.module.scss'
import { ReactComponent as Check } from './assets/svg/check.svg'

type TCheckboxProps = {
  isActive: boolean
  id: string
  toggle: Function
  title: string
}

export const Checkbox: FC<TCheckboxProps> = (props) => {
  const { id, isActive, toggle, title } = props

  const getActiveClassName = (
    styles: { [key: string]: string },
    className: string,
    isActive: boolean
  ) => {
    return isActive
      ? `${styles[className]} ${styles[`${className}Active`]}`
      : styles[className]
  }

  return (
    <div className={styles.container}>
      <label
        className={getActiveClassName(styles, 'title', isActive)}
        htmlFor={id}
      >
        {title}
      </label>
      <div className={styles.inputWrapper}>
        <div
          className={getActiveClassName(styles, 'fakeInput', isActive)}
          onClick={() => toggle(id)}
        >
          <Check />
        </div>
        <input type={'checkbox'} id={id} onChange={() => toggle(id)} />
      </div>
    </div>
  )
}
