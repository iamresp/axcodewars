import * as React from 'react'
import { ThemeSwitcher } from '../../ThemeSwitcher'
import { useAuth } from '../../../shared/hooks/useAuth'

import cls from '../ui/Header.module.css'
import { Link } from 'react-router-dom'

export default function Header (): JSX.Element {
  const [value, setValue] = React.useState(false)
  const { isAuth, user } = useAuth()
  console.log(user)
  let ProfileIcon

  if (isAuth) {
    ProfileIcon = (
      <>
        <div className={cls.profile_cont}>
          <img className={cls.profile_img} src={user.avatar}/>
          <Link to={'/profile'}>
            {user.username}
          </Link>
        </div>
      </>
    )
  }

  return (
    <header className={cls.header}>
      <div className={cls.header_left}>
        <Link to={'/tasks'}>
          <img src='./images/logowhite.svg' alt='' />
        </Link>
      </div>
      <div className={cls.header_right}>
        {ProfileIcon}
        <ThemeSwitcher
          isOn={value}
          handleToggle={() => {
            setValue(!value)
          }}
        />
      </div>
    </header>
  )
}
