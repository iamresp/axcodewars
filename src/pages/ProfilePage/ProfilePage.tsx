import React, { type FC } from 'react'
import { useAuth } from 'shared/hooks/useAuth'
import { Link } from 'react-router-dom'
import { Wrapper } from 'entities/Wrapper'

import cls from './ProfilePage.module.css'
import { motion } from 'framer-motion'

export const ProfilePage: FC = () => {
  const { isLoading, user } = useAuth()

  return (
    <Wrapper>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.mainTitle}>Профиль</motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: 'easeOut'
        }}
        className={cls.profileCont}>
        {isLoading && 'Loading...'}
        {!isLoading && (
          <div className={cls.profileContTop}>
            <img
              className={cls.userAvatar}
              src={
                user.avatar !== ''
                  ? process.env.REACT_APP_SERVER_URL + user.avatar
                  : './images/userlogo.png'
              }
              alt={'user.avatar'}
            />
            <span className={cls.userUsername}>{user.username}</span>
            <Link className={cls.userEdit} to={'/profile/edit'}>
              Редактировать
            </Link>
          </div>
        )}
        <div className={cls.profileContBottom}>
          <div className={cls.userHistory}>
            <p className={cls.userHistoryTitle}>Название таски</p>
            <p className={cls.userHistorySubtext}>
              Описание таски Описание таски Описание таски Описание
              таскиОписание таскиОписание таскиОписание таскиОписание
              таскиОписание таскиОписание таски
            </p>
            <p className={cls.userHistorySubtext}>Время выполнения: 10:00</p>
            <p className={cls.userHistorySubtext}>Статус: победа</p>
          </div>
          <div className={cls.userHistory}>
            <p className={cls.userHistoryTitle}>Название таски</p>
            <p className={cls.userHistorySubtext}>
              Описание таски Описание таски Описание таски Описание
              таскиОписание таскиОписание таскиОписание таскиОписание
              таскиОписание таскиОписание таски
            </p>
            <p className={cls.userHistorySubtext}>Время выполнения: 10:00</p>
            <p className={cls.userHistorySubtext}>Статус: победа</p>
          </div>
          <div className={cls.userHistory}>
            <p className={cls.userHistoryTitle}>Название таски</p>
            <p className={cls.userHistorySubtext}>
              Описание таски Описание таски Описание таски Описание
              таскиОписание таскиОписание таскиОписание таскиОписание
              таскиОписание таскиОписание таски
            </p>
            <p className={cls.userHistorySubtext}>Время выполнения: 10:00</p>
            <p className={cls.userHistorySubtext}>Статус: победа</p>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  )
}
