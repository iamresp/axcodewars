import React, { type FC, type FormEvent, useState } from 'react'
import { AuthState } from './constants'

import api from '../../shared/service/axios/axiosClient.js'

import cls from './AuthPage.module.css'

export const AuthPage: FC = () => {
  const [auth, setAuth] = useState(AuthState.LOGIN)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAuth = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if ((username === '') || (password === '') ||
        (auth === AuthState.REGISTRATION && (imageUrl === ''))) {
      setErrorMessage('Поля не должны быть пустыми')

      return
    }

    if (auth === AuthState.LOGIN) {
      api
        .post('/auth', {
          hash: password,
          username
        })
        .then(res => {
          localStorage.setItem('access_token', res.data?.access_token)
          setErrorMessage('')
          window.location.reload()
        })
        .catch(function (error) {
          if (error.response) {
            setErrorMessage(error.response.data?.message)
          } else {
            setErrorMessage('Произошла ошибка: ' + error.message)
          }
        })
    } else {
      api
        .post('/user', {
          avatar: imageUrl,
          hash: password,
          username
        })
        .then(res => {
          void api
            .post('/auth', {
              hash: password,
              username
            })
            .then(res => {
              localStorage.setItem('access_token', res.data?.access_token)
              setErrorMessage('')
              window.location.reload()
            })
        })
        .catch(function (error) {
          if (error.response) {
            setErrorMessage(error.response.data?.message)
          } else {
            setErrorMessage('Произошла ошибка: ' + error.message)
          }
        })
    }
  }

  return (
      <main className={cls.main}>
        <img
          className={cls.regImage}
          src='/images/reg-img.svg'
          alt='reg-avatar'
        />
        <div className={cls.regFormContainer}>
          {auth === 'login' ? 'Логин' : 'Регистрация'}
          <div className={cls.regSelectText}>
            {auth === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button
                type='button'
                className={cls.regSelectTextButton}
                onClick={() => {
                  setAuth(auth === AuthState.LOGIN
                    ? AuthState.REGISTRATION
                    : AuthState.LOGIN)
                }
              }
            >
              {auth === 'login' ? ' Регистрация' : ' Войти'}
            </button>
          </div>
          <form
            className={cls.form}
            onSubmit={e => {
              void handleAuth(e)
            }}>
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
            }
            }
          />

          {auth === 'registration' && (
            <input
              className={cls.regInput}
              placeholder='Загузка аватара'
              value={imageUrl}
              onChange={event => {
                setImageUrl(event.target.value)
              }}
            />
          )}
          <button
            type='submit'
            className={cls.regButton}
          >
            {auth === 'login' ? 'Войти' : 'Регистрация'}
          </button>
          </form>
        </div>
      </main>
  )
}
