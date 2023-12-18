import React, { type FC } from 'react'
import cls from './ThemeSwitcher.module.css'

interface ThemeSwitcherProps { isOn: boolean, handleToggle: () => void }
export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ handleToggle }) => {
  const themeIsOn = localStorage.getItem('theme') !== 'light'

  return (
    <>
      <input
        checked={themeIsOn}
        onChange={handleToggle}
        className={cls.switchCheckbox}
        id='switch-new'
        type='checkbox'
      />
      <label
        style={{ background: themeIsOn ? 'var(--black-color)' : '' }}
        className={cls.switchLabel}
        htmlFor='switch-new'
      >
      <span className={cls.switchButton} />
      </label>
    </>
  )
}
