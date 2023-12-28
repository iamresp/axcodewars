import * as React from 'react'
import { ThemeSwitcher } from '../../ThemeSwitcher'
import { useAuth } from '../../../shared/hooks/useAuth'

import cls from '../ui/Header.module.css'
import { Link } from 'react-router-dom'
import { LogoSvgComponent } from '../assets/SvgComponents/LogoSvgComponent'
import { Wrapper } from 'entities/Wrapper/Wrapper'

export default function Header (): JSX.Element {
  const [value, setValue] = React.useState(false)
  const { isAuth, user } = useAuth()

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
          {isAuth && (
            <div className={cls.profileCont}>
              <img className={cls.profileImg} src={user.avatar} alt={'UserLogo'}/>
              <Link className={cls.link} to={'/profile'}>
                {user.username}
              </Link>
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
