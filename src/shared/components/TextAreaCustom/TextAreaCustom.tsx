import React, { type TextareaHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

import cls from './styles.module.css'

interface TextAreaCustomProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> { label: string }

export const TextAreaCustom = forwardRef<
HTMLTextAreaElement,
TextAreaCustomProps
>(({ className, label, ...props }, ref) => {
  return (
    <div className={cls.control}>
      <textarea
        ref={ref}
        className={classNames(cls.textAreaCustom, className)}
        {...props}
      />
      <label>
        {label.split(/(\s+)/s).map((element, index, array) => {
          const characters = element.split('')

          return (
            <>
              {
                characters.map((char, i) => (
                  <span key={i + char}
                    style={{ transitionDelay: `${(index * 50) + (i * 50)}ms` }}>
                    {char}
                  </span>
                ))
              }
              {index === array.length - 1 && ' '}
            </>
          )
        })}
      </label>
    </div>
  )
})

TextAreaCustom.displayName = 'TextAreaCustom'
