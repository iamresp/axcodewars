import React, {FC, useState} from 'react';
import cls from './styles.module.css'
import classNames from "classnames";
import InfoIcon from 'shared/images/infoIcon.svg'

interface ToolTipProps {
    content: React.ReactNode
}

const Tooltip: FC<ToolTipProps> = ({content}) => {
    const [isShow, setIsShow] = useState<boolean>(false)

    return (
        <div
            className={classNames(cls.tooltipContainer)}
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
        >
            <InfoIcon />
            {isShow &&
                <div className={classNames(cls.tooltipArrow)}>
                    {content}
                </div>
            }
        </div>
    );
};

export default Tooltip;