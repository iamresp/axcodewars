import React, { type FC, type FormEvent, useState } from 'react'
import { AUTH_STATE } from './constants'
import userService from 'entities/UserApi/user.service'
import { AvatarLoading } from 'features/AvatarLoading'
import { Button, InputCustom } from 'shared/components'
import { Wrapper } from 'entities/Wrapper'
import { errorToast } from 'shared/lib/error-toast'
import { useAuth } from 'shared/hooks/useAuth'

import cls from './AuthPage.module.css'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

export const AuthPage: FC = () => {
  const navigate = useNavigate()

  const [auth, setAuth] = useState(AUTH_STATE.LOGIN)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState<File>()
  const [errorMessage, setErrorMessage] = useState('')

  const { login } = useAuth()

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
      await login(password, username)
      navigate('/tasks')
      setErrorMessage('')

      return
    }

    try {
      await userService.createUser({
        avatar: image?.name ?? '',
        hash: password,
        username
      })

      setErrorMessage('')

      await login(password, username)
    } catch (error) {
      errorToast(error)
    }
  }

  return (
    <Wrapper className={cls.main}>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.regImage}
        src='/images/reg-img.svg'
        alt='reg-avatar'
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.regFormContainer}>
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
            {auth === AUTH_STATE.LOGIN ? 'Регистрация' : 'Войти'}
          </button>
        </div>
        <form
          className={cls.form}
          onSubmit={e => {
            void handleAuth(e)
          }}
        >
          <InputCustom
            required
            className={cls.formInput}
            placeholder='Имя'
            value={username}
            onChange={event => {
              setUsername(event.target.value)
            }}
          />
          <InputCustom
            required
            placeholder='Пароль'
            type='password'
            value={password}
            onChange={event => {
              setPassword(event.target.value)
            }}
          />
          {auth === 'registration' && (
            <AvatarLoading image={image} setImage={setImage}/>
          )}
          {(errorMessage !== '') &&
              (<span className={cls.errorText}>{errorMessage}</span>)
          }<Button isOrange
            text={auth === AUTH_STATE.LOGIN ? 'Войти' : 'Регистрация'}
            type={'submit'} className={cls.regButton} />
        </form>
      </motion.div>
    </Wrapper>
  )
}
