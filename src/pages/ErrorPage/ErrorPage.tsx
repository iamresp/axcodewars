import React from 'react'
import cls from './ErrorPage.module.css'
import Lottie from 'lottie-react'
import animationData from '../../../public/error404.json'
import { Button } from 'shared/components'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className={cls.main}>
      <Lottie animationData={animationData} style={{ height: 500 }} />
      <h1 className={cls.title}>Страница не найдена!</h1>
      <Link to={'/tasks'}>
        <Button className={cls.btnRedirect} text='На главную' isOrange></Button>
      </Link>
    </div>

  )
}
export default ErrorPage
