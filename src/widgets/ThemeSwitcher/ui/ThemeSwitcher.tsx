/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import cls from './ThemeSwitcher.module.css'

export const ThemeSwitcher = ({
  isOn,
  handleToggle
}: {
  isOn: any
  handleToggle: any
}): JSX.Element => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={cls.switch_checkbox}
        id='switch-new'
        type='checkbox'
      />
      <label
        style={{ background: isOn && 'var(--orange-color)' }}
        className={cls.switch_label}
        htmlFor='switch-new'
      >
        <span className={cls.switch_button} />
      </label>
    </>
  )
}
