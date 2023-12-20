import * as React from 'react'
import { ThemeSwitcher } from '../../ThemeSwitcher'
import { PopOver } from 'widgets/PopOver/popOver'
import { useAuth } from '../../../shared/hooks/useAuth'

import cls from '../ui/Header.module.css'
import { Link } from 'react-router-dom'
import { LogoSvgComponent } from '../assets/SvgComponents/LogoSvgComponent'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside'

export default function Header (): JSX.Element {
  const [value, setValue] = React.useState(false)
  const { isAuth, user } = useAuth()
  const [display, setDisplay] = useState(false)

  const node = useRef<HTMLDivElement | null>(null)

  const theme = document.querySelector('body')
  const currentTheme = localStorage.getItem('theme')

  function setTheme (name: string): void {
    theme?.setAttribute('data-theme', name)
    localStorage.setItem('theme', name)
  }

  if (currentTheme != null) {
    theme?.setAttribute('data-theme', currentTheme)
  } else {
    setTheme('light')
  }

  const handleClick = (): void => {
    setDisplay(!display)
  }

  const handleClose = (): void => {
    setDisplay(false)
  }

  useOnClickOutside(node, handleClose)

  const handleToggle = (): void => {
    setValue(!value)
    if (theme?.getAttribute('data-theme') === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <header className={cls.header}>
      <div className={cls.headerLeft}>
        <Link to={'/tasks'}>
          <LogoSvgComponent/>
        </Link>
      </div>
      <div className={cls.headerRight}>
        {isAuth && (
          <div className={cls.profileContWrapper} onClick={handleClick} ref={node}>
            <div className={cls.profileCont}>
              <img className={cls.profileImg}
                src={(user.avatar !== '') ? process.env.REACT_APP_SERVER_URL + user.avatar : './images/userlogo.png'}
                alt={'user.avatar'}/>
              <p>{user.username}</p>
            </div>
            {display && (<PopOver/>)}
          </div>
        )}

        <ThemeSwitcher
          isOn={value}
          handleToggle={handleToggle}
        />
      </div>
    </header>
  )
}
