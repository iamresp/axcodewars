import * as React from 'react'

import cls from '../ui/Footer.module.css'
import { Wrapper } from '../../../entities/Wrapper/Wrapper'

export default function Footer (): JSX.Element {
  return (
      <Wrapper>
        <footer className={cls.footer}>
            <p>© 2023, ООО «АксТим»</p>
        </footer>
      </Wrapper>
  )
}
