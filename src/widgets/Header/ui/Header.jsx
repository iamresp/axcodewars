import * as React from "react";
import { useState } from 'react';
import { ThemeSwitcher } from '../../ThemeSwitcher/index'

import cls from '../ui/Header.module.css';
 
export default function Header() {
    const [value, setValue] = useState(false);
    return (
        <header className={cls.header}> 
            <img src="./images/logowhite.svg" alt="" />     
            <ThemeSwitcher
                isOn={value}
                handleToggle={() => setValue(!value)}
            />
        </header>
    );
}