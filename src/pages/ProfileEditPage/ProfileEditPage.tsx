import React, {
  type FC,
  useState,
  type FormEvent,
  type ChangeEvent
} from 'react'
import userService from 'entities/UserApi/user.service'
import { toastFetchStatus } from 'shared/lib/toastFetchingStatus'
import { useAuth } from 'shared/hooks/useAuth'
import { AvatarLoading } from 'features/AvatarLoading'
import { Button } from 'shared/components'
import Avatar from 'shared/images/userlogo.png'
import PasswordVisible from 'shared/images/password-visible.svg'

import cls from './styles.module.css'

export const ProfileEditPage: FC = () => {
  const { user, isLoading } = useAuth()

  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleCompare, setIsVisibleCompare] = useState(false)

  const [avatar, setAvatar] = useState<File>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passCompare, setPassCompare] = useState('')

  const handleVisible = (type: 'password' | 'pass-compare'): void => {
    type === 'password'
      ? setIsVisible(prev => !prev)
      : setIsVisibleCompare(prev => !prev)
  }

  const handleValue = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'username' | 'password' | 'pass-compare' = 'username'
  ): void => {
    const value = e.target.value

    switch (type) {
      case 'username':
        setUsername(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'pass-compare':
        setPassCompare(value)
        break
      default:
        break
    }
  }

  const imageSrc = (): string | undefined => {
    if (avatar != null) {
      return URL.createObjectURL(avatar)
    }

    if (user.avatar.length > 0) {
      return process.env.REACT_APP_SERVER_URL + '/' + user.avatar
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      await userService.editUser({
        hash: password,
        username,
        avatar: avatar?.name
      })
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <div className={cls.profileEditPage}>
      <h2 className='main_title'>Редактирование профиля</h2>
      <div className={cls.content}>
        {isLoading && 'LOADING...'}
        {!isLoading && (
          <div className={cls.contentUser}>
            <img
              src={imageSrc() ?? Avatar}
              alt='user_avatar'
              className={cls.userAvatar}
            />
            <h3 className={cls.username}>
              {user.username.length > 0 ? user.username : 'USERNAME'}
            </h3>
            <AvatarLoading
              isProfile
              className={cls.avatarLoading}
              imageUrl={avatar}
              setImageUrl={setAvatar}
            />
          </div>
        )}
        <form
          onSubmit={e => {
            toastFetchStatus(handleSubmit(e), {
              success: 'Вы успешно отредактировали профиль!'
            })
          }}
          className={cls.contentForm}
        >
          <div className={cls.inputWrapper}>
            <div className={cls.inputContainer}>
              <label className={cls.inputLabel} htmlFor='username'>
                Имя пользователя
              </label>
              <input
                placeholder='Введите новое имя пользователя'
                className={cls.input}
                type='text'
                id='username'
                onChange={e => {
                  handleValue(e, 'username')
                }}
                value={username}
              />
            </div>
            <div className={cls.inputContainer}>
              <label className={cls.inputLabel} htmlFor='password'>
                Пароль
              </label>
              <div className={cls.inputPassword}>
                <input
                  className={cls.input}
                  id='password'
                  type={isVisible ? 'text' : 'password'}
                  placeholder='Введите новый пароль'
                  onChange={e => {
                    handleValue(e, 'password')
                  }}
                  value={password}
                />
                <button
                  className={cls.passwordVisible}
                  onClick={() => {
                    handleVisible('password')
                  }}
                  type='button'
                >
                  <PasswordVisible />
                </button>
              </div>
            </div>
            <div className={cls.inputContainer}>
              <label className={cls.inputLabel} htmlFor='pass-compare'>
                Повторите пароль
              </label>
              <div className={cls.inputPassword}>
                <input
                  placeholder='Повторите новый пароль'
                  className={cls.input}
                  id='pass-compare'
                  type={isVisibleCompare ? 'text' : 'password'}
                  onChange={e => {
                    handleValue(e, 'pass-compare')
                  }}
                  value={passCompare}
                />
                <button
                  className={cls.passwordVisible}
                  onClick={() => {
                    handleVisible('pass-compare')
                  }}
                  type='button'
                >
                  <PasswordVisible />
                </button>
              </div>
            </div>
          </div>
          <Button
            className={cls.submitBtn}
            isOrange
            type='submit'
            text={'Сохранить'}
          />
        </form>
      </div>
    </div>
  )
}
