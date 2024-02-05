import React, { type FC } from 'react'
import cls from './styles.module.css'

interface LoadingProps {
  height?: number
}

export const Loading: FC<LoadingProps> = ({ height }) => {
  return (
    <div style={{
      height: `${height}px`,
      marginBottom: '16px'
    }}
    className={cls.main}>
      <div className={cls.loader}></div>
    </div>
  )
}
