import { RefObject, useEffect } from 'react'

type TUseClickOutSideArg = {
  ref: RefObject<any>
  callback: () => void
}

export const useClickOutSide = ({ ref, callback }: TUseClickOutSideArg) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
