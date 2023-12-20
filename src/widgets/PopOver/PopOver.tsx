import cls from './PopOver.module.css'
import { Link, useNavigate } from 'react-router-dom'
import * as React from 'react'

export const PopOver = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={cls.popOver}>
        <Link className={cls.link} to={'/profile'}>
              Профиль
        </Link>
        <Link className={cls.link} to={'/tasks'}>
              Таски
        </Link>
        <Link type={'button'} className={cls.link} onClick={() => {
          localStorage.removeItem('access_token')
        }} to={'/auth'}>
            Выйти
        </Link>
      </div>
    </>
  )
}
