import React, { type FC } from 'react'
import { Wrapper } from 'entities/Wrapper'

import cls from './Footer.module.css'

export const Footer: FC = () => {
  return (
    <Wrapper className={cls.wrapper}>
      <footer className={cls.footer}>
        <p>©{new Date().getFullYear()}, ООО «АксТим»</p>
      </footer>
    </Wrapper>
  )
}
