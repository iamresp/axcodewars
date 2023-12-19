import React, { type TextareaHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

import cls from './styles.module.css'

interface TextAreaCustomProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextAreaCustom = forwardRef<
  HTMLTextAreaElement,
  TextAreaCustomProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={classNames(cls.textAreaCustom, className)}
      {...props}
    />
  )
})

TextAreaCustom.displayName = 'TextAreaCustom'
