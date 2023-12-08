import { useState } from 'react'
import { useAuth } from '../../shared/hooks/useAuth'
import { Link } from 'react-router-dom'
// import api from '../../shared/service/axios/axiosClient.js'

import cls from './ProfilePage.module.css'

export const ProfilePage = () => {
  const { isAuth, user } = useAuth()

  return (
    <>
      <main className={cls.main}>
        <h1 className={cls.h1} style={{
          marginTop: '50px',
          marginBottom: '100px'
        }}>
          Профиль
        </h1>
        <div className={cls.profile_cont}>
          <div className={cls.profile_cont_top}>
            <img className={cls.user_avatar} src={user.avatar}/>
            <span className={cls.user_username}>{user.username}</span>
            <Link className={cls.user_edit} to={'/tasks'}>Редактировать</Link>
          </div>
          <div className={cls.profile_cont_bottom}>
            <div className={cls.user_history}>
              <p className={cls.user_history_title}>Название таски</p>
              <p className={cls.user_history_subtext}>Описание таски Описание таски Описание таски Описание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таски</p>
              <p className={cls.user_history_subtext}>Время выполнения: 10:00</p>
              <p className={cls.user_history_subtext}>Статус: победа</p>
            </div>
            <div className={cls.user_history}>
              <p className={cls.user_history_title}>Название таски</p>
              <p className={cls.user_history_subtext}>Описание таски Описание таски Описание таски Описание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таски</p>
              <p className={cls.user_history_subtext}>Время выполнения: 10:00</p>
              <p className={cls.user_history_subtext}>Статус: победа</p>
            </div>
            <div className={cls.user_history}>
              <p className={cls.user_history_title}>Название таски</p>
              <p className={cls.user_history_subtext}>Описание таски Описание таски Описание таски Описание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таски</p>
              <p className={cls.user_history_subtext}>Время выполнения: 10:00</p>
              <p className={cls.user_history_subtext}>Статус: победа</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
