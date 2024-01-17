import React, { type FC } from 'react'
import { Link } from 'react-router-dom'
import {
  PopOverExit,
  PopOverProfile,
  PopOverTask
} from 'widgets/Header/assets/SvgComponents/LogoSvgComponent'
import { useAuth } from 'shared/hooks/useAuth'
import cls from './PopOver.module.css'

export const PopOver: FC = () => {
  const { logout } = useAuth()

  return (
    <>
      <div className={cls.popOver}>
        <Link to={'/profile'} className={cls.popOverSection}>
          <PopOverProfile />
          <p className={cls.p}>
                Профиль
          </p>
        </Link>
        <Link to={'/tasks'} className={cls.popOverSection}>
          <PopOverTask />
          <p className={cls.p}>
                Таски
          </p>
        </Link>
        <Link to={'/auth'} className={cls.popOverSection} onClick={logout} >
          <PopOverExit />
          <p className={cls.p}>
              Выйти
          </p>
        </Link>
      </div>
    </>
  )
}
