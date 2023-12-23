import React, { type ChangeEvent, type FC } from 'react'
import classNames from 'classnames'
import cls from './AvatarLoading.module.css'

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
  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
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
          {image != null ? image.name : 'Загрузить аватар'}
        </span>
      </label>
    </>
  )
}
