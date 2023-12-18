import React, { type FC } from 'react'
import { useAuth } from '../../shared/hooks/useAuth'
import { Link } from 'react-router-dom'

import cls from './ProfilePage.module.css'

export const ProfilePage: FC = () => {
  const { isLoading, user } = useAuth()

  return (
      <main className={cls.main}>
        <h1 className={cls.mainTitle}>
          Профиль
        </h1>
        <div className={cls.profileCont}>
          {isLoading && 'Loading...'}
          {!isLoading && (
          <div className={cls.profileContTop}>
            <img className={cls.userAvatar} src={(user.avatar !== '') ? process.env.REACT_APP_SERVER_URL + user.avatar : './images/userlogo.png'} alt={'user.avatar'}/>
            <span className={cls.userUsername}>{user.username}</span>
            <Link className={cls.userEdit} to={'/tasks'}>Редактировать</Link>
          </div>
          )}
          <div className={cls.profileContBottom}>
            <div className={cls.userHistory}>
              <p className={cls.userHistory_title}>Название таски</p>
              <p className={cls.userHistorySubtext}>Описание таски Описание таски Описание таски Описание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таски</p>
              <p className={cls.userHistorySubtext}>Время выполнения: 10:00</p>
              <p className={cls.userHistorySubtext}>Статус: победа</p>
            </div>
            <div className={cls.userHistory}>
              <p className={cls.userHistoryTitle}>Название таски</p>
              <p className={cls.userHistorySubtext}>Описание таски Описание таски Описание таски Описание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таски</p>
              <p className={cls.userHistorySubtext}>Время выполнения: 10:00</p>
              <p className={cls.userHistorySubtext}>Статус: победа</p>
            </div>
            <div className={cls.userHistory}>
              <p className={cls.userHistoryTitle}>Название таски</p>
              <p className={cls.userHistorySubtext}>Описание таски Описание таски Описание таски Описание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таскиОписание таски</p>
              <p className={cls.userHistorySubtext}>Время выполнения: 10:00</p>
              <p className={cls.userHistorySubtext}>Статус: победа</p>
            </div>
          </div>
        </div>
      </main>
  )
}
