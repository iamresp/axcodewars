import React from 'react'
import cls from './Loading.module.css'

export const Loading = () => {
  return (
    <div className={cls.main}><div className={cls.loader}></div></div>
  )
}
