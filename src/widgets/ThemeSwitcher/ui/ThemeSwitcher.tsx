import React, { type FC } from 'react'
import cls from './ThemeSwitcher.module.css'

/**
 * Компонент для переключения темы интерфейса.
 * Использует значение, сохраненное в localStorage, для определения текущей темы
 * и позволяет пользователю переключать тему интерфейса между светлой и темной.
 *
 * @param {Object} props Свойства компонента.
 * @param {Function} props.handleToggle Функция, вызываемая при переключении темы.
 */

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
