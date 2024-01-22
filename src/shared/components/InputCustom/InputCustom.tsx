import React, { forwardRef, type InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import cls from './styles.module.css'

interface InputCustomProps extends InputHTMLAttributes<HTMLInputElement> { label: string }

export const InputCustom = forwardRef<HTMLInputElement, InputCustomProps>(
  ({ className, type = 'text', label, ...props }, ref) => {
    return (
      <div className={cls.control}>
        <input
          className={classNames(cls.inputCustom, className)}
          ref={ref}
          type={type}
          {...props}
        />
        <label>
          {label.split('').map((element, index) => {
            return <span style={{ transitionDelay: `${index * 50}ms` }}>{element}</span>
          })}
        </label>
      </div>
    )
  }
)

InputCustom.displayName = 'InputCustom'
