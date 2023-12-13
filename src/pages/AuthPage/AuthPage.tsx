import { useState } from 'react'
import { AuthState } from './constants'
import {AvatarLoading} from "../../shared/components/AvatarLoading/AvatarLoading";

import api from '../../shared/service/axios/axiosClient.js'

import cls from './AuthPage.module.css'


export const AuthPage = () => {
  const [auth, setAuth] = useState(AuthState.LOGIN)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const handleAuth = async () => {
    if ((username === '') || (password === '') ||
        (auth === AuthState.REGISTRATION && (imageUrl === '') ))  {
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
    <>
      <main className={cls.main}>
        <img className={cls.reg_image} src='/images/reg-img.svg' alt='' />

        <div className={cls.reg_form}>
          {auth === 'login' ? 'Логин' : 'Регистрация'}

          <div className={cls.reg_selecttext}>
            {auth === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}

            <button
                type='button'
                className={cls.reg_selecttext_button}
                onClick={() => {
                  setAuth(auth === AuthState.LOGIN ? AuthState.REGISTRATION : AuthState.LOGIN)
                }
              }
            >
              {auth === 'login' ? ' Регистрация' : ' Войти'}
            </button>
          </div>

          <input
            className={cls.reg_input}
            placeholder='Имя'
            value={username}
            onChange={event => {
              setUsername(event.target.value)
            }}
          />

          <input
            className={cls.reg_input}
            placeholder='Пароль'
            type='password'
            value={password}
            onChange={event => {
              setPassword(event.target.value)
            }}
          />

          {auth === 'registration' && (
              <AvatarLoading  imageUrl={imageUrl} setImageUrl={setImageUrl}/>
          )}

          <button
              className={cls.reg_button}
              onClick={handleAuth}
          >
            {auth === 'login' ? 'Войти' : 'Регистрация'}
          </button>

        </div>
      </main>
    </>
  )
}
