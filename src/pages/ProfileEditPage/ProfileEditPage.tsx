import React, {
  type FC,
  useState,
  type FormEvent,
  type ChangeEvent, type ReactNode
} from 'react'
import userService from 'entities/UserApi/user.service'
import { toastFetchStatus } from 'shared/lib/toastFetchingStatus'
import { useAuth } from 'shared/hooks/useAuth'
import { AvatarLoading } from 'features/AvatarLoading'
import { Button } from 'shared/components'
import PasswordHide from 'shared/images/password-closed.svg'
import PasswordVisible from 'shared/images/password-open.svg'

import cls from './styles.module.css'
import { Wrapper } from 'entities/Wrapper'
import { motion } from 'framer-motion'
import UserLogo from 'shared/images/userLogo.jpg'

export const ProfileEditPage: FC = () => {
  const { user, fetchUser } = useAuth()

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

  const handlePasswordIcon = (visible: boolean): ReactNode => {
    return visible
      ? <PasswordVisible />
      : <PasswordHide />
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

  const getAvatar = (): string | undefined => {
    if (avatar != null) {
      return URL.createObjectURL(avatar)
    }

    if (user.avatar.length > 0) {
      return user.avatar
    }

    return UserLogo
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (password.trim() === '' && passCompare.trim() === '' &&
        username.trim() === '' && avatar === undefined) {
      throw new Error('Заполните поля для редактирования!')
    }

    const formData = new FormData()

    avatar !== undefined && formData.append('avatar', avatar)

    if (password.trim() !== '') {
      if (password === passCompare) {
        formData.append('hash', password)
      } else {
        throw new Error('Пароли не совпадают!')
      }
    }

    username.trim().length > 0 && formData.append('username', username)

    try {
      await userService.editUser(formData)
      void fetchUser()
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <Wrapper className={cls.profileEditPage}>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className='main_title'>Редактирование профиля</motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.content}>
        <div className={cls.contentUser}>
          <img
            src={getAvatar()}
            alt='user_avatar'
            className={cls.userAvatar}
          />
          <h3 className={cls.username}>
            {user.username.length > 0 ? user.username : 'USERNAME'}
          </h3>
          <AvatarLoading
            isProfile
            className={cls.avatarLoading}
            image={avatar}
            setImage={setAvatar}
          />
        </div>
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
                  {handlePasswordIcon(isVisible)}
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
                  {handlePasswordIcon(isVisibleCompare)}
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
      </motion.div>
    </Wrapper>
  )
}
