import React, { type ChangeEvent, type FC } from 'react'
import classNames from 'classnames'
import cls from './AvatarLoading.module.css'

/**
 * Компонент для загрузки и отображения аватара пользователя.
 * Позволяет пользователю выбрать файл изображения с его устройства и отображает имя файла после выбора.
 *
 * @param {Object} props Свойства компонента.
 * @param {File | undefined} props.image Текущее выбранное изображение аватара.
 * @param {React.Dispatch<React.SetStateAction<File | undefined>>} props.setImage Функция установки выбранного изображения аватара.
 * @param {boolean} [props.isProfile=false] Флаг, указывающий, используется ли компонент в профиле пользователя.
 * @param {string} [props.className] Дополнительный класс для стилизации.
 */

interface AvatarLoadingProps {
  image?: File
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>
  isProfile?: boolean
  className?: string
}

export const AvatarLoading: FC<AvatarLoadingProps> = ({
  image,
  setImage,
  isProfile = false,
  className
}) => {
    /**
     * Обрабатывает выбор файла изображения и обновляет состояние компонента.
     *
     * @param {ChangeEvent<HTMLInputElement>} event Событие изменения входного файла.
     */
  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    // Установка выбранного файла, если он есть
    if (event.target.files?.[0] != null) {
      setImage(event.target.files[0])
    }
  }

  return (
    <>
      <input
        className={cls.regInput}
        placeholder='Загузка аватара'
        type='file'
        id='avatarLoading'
        accept='image/png, image/jpeg, image/svg'
        onChange={handleImage}
      />
      <label
        className={classNames(cls.regLabel, className)}
        htmlFor='avatarLoading'
      >
        {!isProfile && (
          <img src='/images/avatarDownload.svg' alt='avatarLoadingIcon' />
        )}
        <span className={cls.regSpan}>
          {image != null && !isProfile ? image.name : 'Загрузить аватар'}
        </span>
      </label>
    </>
  )
}
