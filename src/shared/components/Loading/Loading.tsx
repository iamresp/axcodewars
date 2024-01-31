import React, { type FC } from 'react'
import cls from './Loading.module.css'

export const Loading: FC = () => {
  return (
    <div className={cls.main}><div className={cls.loader}></div></div>
  )
}
