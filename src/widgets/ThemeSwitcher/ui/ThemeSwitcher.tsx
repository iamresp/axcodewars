import React, { type FC } from 'react'
import cls from './ThemeSwitcher.module.css'

interface ThemeSwitcherProps {
  isOn: boolean
  handleToggle: () => void
}
export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ handleToggle }) => {
  const themeIsOn = localStorage.getItem('theme') !== 'light'

  return (
    <>
      <label
        style={{ background: themeIsOn ? 'var(--black-color)' : '' }}
        className={cls.switch}
        htmlFor='switch-new'
      >
        <input
          checked={themeIsOn}
          onChange={handleToggle}
          className={cls.switchCheckbox}
          id='switch-new'
          type='checkbox'
        />
        <span className={cls.slider}>{}</span>
      </label>
    </>
  )
}
