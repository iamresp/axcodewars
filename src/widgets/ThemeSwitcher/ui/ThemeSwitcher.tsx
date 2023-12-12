import React, { type FC } from 'react'
import cls from './ThemeSwitcher.module.css'

interface ThemeSwitcherProps { isOn: boolean, handleToggle: () => void }
export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({handleToggle }) => {

  const themeIsOn = localStorage.getItem('theme') !== 'light';

  return (
    <>
      <input
        checked={themeIsOn}
        onChange={handleToggle}
        className={cls.switch_checkbox}
        id='switch-new'
        type='checkbox'
      />
      <label
        style={{ background: themeIsOn ? 'var(--black-color)' : '' }}
        className={cls.switch_label}
        htmlFor='switch-new'
      >
      <span className={cls.switch_button} />
      </label>
    </>
  )
}
