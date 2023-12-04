import React, { useState } from 'react'
import { Alert, CssBaseline, Grid } from '@mui/material'
import * as PropTypes from 'prop-types'
import {
  AuthBox,
  AuthButton,
  AuthHint,
  AuthHintButton,
  AuthInput,
  AuthTitle
} from './AuthPage.styled'
import api from '../../shared/service/axios/axiosClient'

import cls from './AuthPage.module.css'

export const AuthPage = () => {
  const [auth, setAuth] = useState('login')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAuth = async () => {
    if (!username || !password || (auth === 'registration' && !imageUrl)) {
      setErrorMessage('Поля не должны быть пустыми')
      return;
    }

    if (auth === 'login') {
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
    <>
      <main className={cls.main}>
        <img className={cls.reg_image} src='./images/reg-img.svg' alt='' />

        <div className={cls.reg_form}>
          {auth === 'login' ? 'Логин' : 'Регистрация'}

          <div className={cls.reg_selecttext}>
            {auth === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}

            <a
              className={cls.reg_selecttext_button}
              onClick={() =>
                setAuth(auth === 'login' ? 'registration' : 'login')
              }
            >
              {auth === 'login' ? ' Регистрация' : ' Войти'}
            </a>
          </div>

          <input
            className={cls.reg_input}
            label='Имя'
            placeholder='Имя'
            value={username}
            onChange={event => {
              setUsername(event.target.value)
            }}
          />

          <input
            className={cls.reg_input}
            label='Пароль'
            placeholder='Пароль'
            type='password'
            value={password}
            onChange={event => {
              setPassword(event.target.value)}
            }
          />

          {auth === 'registration' && (
            <input
              className={cls.reg_input}
              label='Загузка аватара'
              placeholder='Загузка аватара'
              value={imageUrl}
              onChange={event => {
                setImageUrl(event.target.value)
              }}
            />
          )}

          <button
            className={cls.reg_button}
            onClick={handleAuth}
            variant='contained'
          >
            {auth === 'login' ? 'Войти' : 'Регистрация'}
          </button>
        </div>
      </main>
    </>
  )
};