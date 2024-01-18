import React from 'react'
import cls from './styles.module.css'

export const Loading = () => {
  return (
    <div className={cls.main}><div className={cls.loader}></div></div>
  )
}
