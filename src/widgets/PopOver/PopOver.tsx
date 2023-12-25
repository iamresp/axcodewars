import cls from './PopOver.module.css'
import { Link, useNavigate } from 'react-router-dom'
import * as React from 'react'
import { PopOverExit, PopOverProfile, PopOverTask } from 'widgets/Header/assets/SvgComponents/LogoSvgComponent'

export const PopOver = () => {
  const navigate = useNavigate()

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
        <Link to={'/auth'} className={cls.popOverSection} onClick={() => {
          localStorage.removeItem('access_token')
        }} >
          <PopOverExit />
          <p className={cls.p}>
              Выйти
          </p>
        </Link>
      </div>
    </>
  )
}
