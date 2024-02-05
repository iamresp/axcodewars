import React, { type FC } from 'react'
import cls from './styles.module.css'

export const Loading: FC = () => {
  return (
    <div className={cls.main}><div className={cls.loader}></div></div>
  )
}
