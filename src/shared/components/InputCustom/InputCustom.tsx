import React, { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import cls from './styles.module.css'

interface InputCustomProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputCustom = forwardRef<HTMLInputElement, InputCustomProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        className={classNames(cls.inputCustom, className)}
        ref={ref}
        type={type}
        {...props}
      />
    )
  }
)

InputCustom.displayName = 'InputCustom'
