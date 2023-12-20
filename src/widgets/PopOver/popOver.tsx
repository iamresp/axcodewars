import cls from './PopOver.module.css'
import { Link } from 'react-router-dom'
import * as React from 'react'

export const PopOver = () => {
  return (
    <>
      <div className={cls.popOver}>
        <Link className={cls.link} to={'/profile'}>
              Профиль
        </Link>
        <Link className={cls.link} to={'/tasks'}>
              Таски
        </Link>
        <Link className={cls.link} onClick={() => {
          localStorage.removeItem('access_token')
        }} to={'/auth'}>
            Выйти
        </Link>
      </div>
    </>
  )
}
