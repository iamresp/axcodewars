import * as React from 'react'
import { ThemeSwitcher } from '../../ThemeSwitcher/ui/ThemeSwitcher'

import cls from '../ui/Header.module.css'

export default function Header (): JSX.Element {
  const [value, setValue] = React.useState(false)

  return (
        <header className={cls.header}>
            <img src='./images/logowhite.svg' alt='' />
            <ThemeSwitcher
                isOn={value}
                handleToggle={() => {
                  setValue(!value)
                }}
            />
        </header>
  )
}
