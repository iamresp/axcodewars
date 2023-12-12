import React, { type FC } from 'react'
import cls from './ThemeSwitcher.module.css'

interface ThemeSwitcherProps { isOn: boolean, handleToggle: () => void }
export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ isOn, handleToggle }) => {
  localStorage.getItem('theme') === 'light' ? isOn = false : isOn = true

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
        style={{ background: isOn ? 'var(--black-color)' : '' }}
        className={cls.switch_label}
        htmlFor='switch-new'
      >
      <span className={cls.switch_button} />
      </label>
    </>
  )
}
