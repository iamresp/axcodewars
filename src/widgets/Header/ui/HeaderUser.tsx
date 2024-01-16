import React, { useRef, useState } from 'react'
import cls from 'widgets/Header/ui/Header.module.css'
import { PopOver } from 'widgets/PopOver/PopOver'
import { useAuth } from 'shared/hooks/useAuth'

const HeaderUser = () => {
  const { user } = useAuth()
  const [display, setDisplay] = useState(false)

  const handleClick = (): void => {
    setDisplay(!display)
  }
  const node = useRef<HTMLDivElement | null>(null)

  return (
    <div tabIndex={0} role={'button'} className={cls.profileContWrapper} onKeyDown={() => {
    }} onClick={handleClick} ref={node}>
      <div className={cls.profileCont}>
        <img className={cls.profileImg}
          src={(user.avatar !== '') ? process.env.REACT_APP_SERVER_URL + user.avatar : './images/userlogo.png'}
          alt={'user.avatar'}/>
        <p className={cls.profileUsername}>{user.username}</p>
      </div>
      {display && (<PopOver/>)}
    </div>
  )
}

export default HeaderUser
