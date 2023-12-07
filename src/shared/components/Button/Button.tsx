import React, { type ButtonHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

import cls from './styles.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  isOrange?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, type = 'button', isOrange = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={classNames(cls.button, isOrange && cls.orangeBtn, className)}
        {...props}
      >
        {text}
      </button>
    )
  }
)

Button.displayName = 'Button'
