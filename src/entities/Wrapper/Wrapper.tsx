import React, { type FC, type ReactNode } from 'react'
import classnames from 'classnames'

import cls from './Wrapper.module.css'

interface WrapperProp {
  children: ReactNode
  className?: string
}

export const Wrapper: FC <WrapperProp> = ({ children, className }) => {
  return (
        <div className={classnames(cls.wrapper, className)}>
            {children}
        </div>
  )
}
