import React, { type ChangeEvent, type FC } from 'react'
import cls from './AvatarLoading.module.css'

interface AvatarLoadingProps {
  imageUrl?: string
  setImageUrl?: React.Dispatch<React.SetStateAction<string>>
}

export const AvatarLoading: FC<AvatarLoadingProps> = ({ imageUrl, setImageUrl }) => {
  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if ((event.target.files?.[0]) != null) {
      if (setImageUrl !== undefined) {
        setImageUrl(event.target.files[0].name)
      }
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
        className={cls.regLabel}
        htmlFor='avatarLoading'
      >
        <img src='/images/avatarDownload.svg' alt='avatarLoadingIcon'/>
        <span className={cls.regSpan}>
          {(imageUrl != null) &&
          imageUrl?.length > 0
            ? imageUrl
            : 'Загрузить аватар'}
        </span>
      </label>
    </>
  )
}
