import * as React from 'react'
import { Wrapper } from 'entities/Wrapper'

import cls from '../ui/Footer.module.css'

export default function Footer (): JSX.Element {
  return (
    <Wrapper className={cls.wrapper}>
      <footer className={cls.footer}>
        <p>©{new Date().getFullYear()}, ООО «АксТим»</p>
      </footer>
    </Wrapper>
  )
}
