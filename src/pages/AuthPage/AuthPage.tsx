import React, { type FC, type FormEvent, useState } from 'react'
import { AUTH_STATE } from './constants'
import userService from '../../entities/UserApi/user.service'
import { AvatarLoading } from 'features/AvatarLoading/AvatarLoading'
import { Button } from 'shared/components/Button/Button'
import { Wrapper } from 'entities/Wrapper/Wrapper'

import cls from './AuthPage.module.css'

export const AuthPage: FC = () => {
  const [auth, setAuth] = useState(AUTH_STATE.LOGIN)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState<File>()
  const [errorMessage, setErrorMessage] = useState('')

  const handleAuth = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (
      username === '' ||
      password === '' ||
      (auth === AUTH_STATE.REGISTRATION && image === undefined)
    ) {
      setErrorMessage('Поля не должны быть пустыми')

      return
    }

    if (auth === AUTH_STATE.LOGIN) {
      try {
        await userService.authenticateUser({ hash: password, username })
        setErrorMessage('')
      } catch (error) {
        throw new Error()
      }

      return
    }

    try {
      await userService.createUser({
        avatar: image?.name ?? '',
        hash: password,
        username
      })
      setErrorMessage('')
      await userService.authenticateUser({ hash: password, username })
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <Wrapper>
      <main className={cls.main}>
        <img
          className={cls.regImage}
          src='/images/reg-img.svg'
          alt='reg-avatar'
        />
        <div className={cls.regFormContainer}>
          {auth === AUTH_STATE.LOGIN ? 'Логин' : 'Регистрация'}
          <div className={cls.regSelectText}>
            {auth === AUTH_STATE.LOGIN ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button
              type='button'
              className={cls.regSelectTextButton}
              onClick={() => {
                setAuth(
                  auth === AUTH_STATE.LOGIN
                    ? AUTH_STATE.REGISTRATION
                    : AUTH_STATE.LOGIN
                )
                setErrorMessage('')
              }}
            >
              {auth === AUTH_STATE.LOGIN ? ' Регистрация' : ' Войти'}
            </button>
          </div>
          <form
            className={cls.form}
            onSubmit={e => {
              void handleAuth(e)
            }}
          >
            <input
              required
              className={cls.regInput}
              placeholder='Имя'
              value={username}
              onChange={event => {
                setUsername(event.target.value)
              }}
            />
            <input
              required
              className={cls.regInput}
              placeholder='Пароль'
              type='password'
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
            {auth === 'registration' && (
              <AvatarLoading image={image} setImage={setImage} />
            )}
            {errorMessage !== '' &&
                <span className={cls.errorText}>{errorMessage}</span>
            }
            <Button text={auth === AUTH_STATE.LOGIN ? 'Войти' : 'Регистрация'}
              type={'submit'} className={cls.regButton} />
          </form>
        </div>
      </main>
    </Wrapper>
  )
}
