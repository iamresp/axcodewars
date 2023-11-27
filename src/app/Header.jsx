import * as React from "react";
import Switch from "./Switch";
import { useState } from 'react';
 
export default function Header() {
    const [value, setValue] = useState(false);
    return (
        <header> 
            <img src="./images/logowhite.svg" alt="" /> 
            
            <Switch
                isOn={value}
                handleToggle={() => setValue(!value)}
            />
        </header>
    );
}