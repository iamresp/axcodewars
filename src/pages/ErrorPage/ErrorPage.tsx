import React from 'react'
import cls from './ErrorPage.module.css'
import Lottie from 'lottie-react'
import animationData from '../../../public/error404.json'

const ErrorPage = () => {
  return (
    <div className={cls.main}>
      <Lottie animationData={animationData} />
    </div>

  )
}
export default ErrorPage
