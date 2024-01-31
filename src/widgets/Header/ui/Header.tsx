import React, { type FC, useContext, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { PopOver } from 'widgets/PopOver'
import { useAuth } from 'shared/hooks/useAuth'
import { ThemeContext } from 'app/context/ThemeContext'
import { LogoSvgComponent } from '../assets/SvgComponents/LogoSvgComponent'
import { Wrapper } from 'entities/Wrapper'
import { useOnClickOutside } from 'shared/hooks/useOnClickOutside'
import cls from './Header.module.css'

export const Header: FC = () => {
  const { pathname } = useLocation()

  const [value, setValue] = useState(false)
  const { user } = useAuth()
  const [display, setDisplay] = useState(false)

  const node = useRef<HTMLDivElement | null>(null)
  const { setCurrentTheme } = useContext(ThemeContext)

  const theme = document.querySelector('body')
  const currentTheme = localStorage.getItem('theme')

  function setTheme (name: string): void {
    theme?.setAttribute('data-theme', name)
    localStorage.setItem('theme', name)
    setCurrentTheme(name)
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
    <Wrapper className={cls.wrapper}>
      <header className={cls.header}>
        <div className={cls.headerLeft}>
          <Link to={'/tasks'}>
            <LogoSvgComponent/>
          </Link>
        </div>
        <div className={cls.headerRight}>
          {pathname !== '/auth' && (
            <div
              tabIndex={0}
              role={'button'}
              className={cls.profileContWrapper}
              onKeyDown={() => {}}
              onClick={handleClick}
              ref={node}
            >
              <div className={cls.profileCont}>
                <img className={cls.profileImg}
                  src={(user.avatar !== '')
                    ? process.env.REACT_APP_SERVER_URL + '/' + user.avatar
                    : './images/userlogo.png'}
                  alt={'user.avatar'}/>
                <p className={cls.profileUsername}>{user.username}</p>
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
    </Wrapper>
  )
}
