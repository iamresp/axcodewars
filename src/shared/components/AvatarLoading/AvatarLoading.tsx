import React, {ChangeEvent, FC} from 'react'
import api from '../../service/axios/axiosClient'
import cls from './AvatarLoading.module.css'

interface AvatarLoadingProps{
    imageUrl?:string,
    setImageUrl?:React.Dispatch<React.SetStateAction<string>>,
}

export const AvatarLoading: FC<AvatarLoadingProps> = ({imageUrl, setImageUrl}) => {

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files?.[0]){
            if (setImageUrl) {
                setImageUrl(event.target.files[0].name)
            }
        }
    }

    // const imageSrc = () =>{
    //     if(imageUrl){
    //         return URL.createObjectURL(imageUrl)
    //     }
    // }
    //
    // console.log(imageUrl)

    return (
        <>
            <input
                className={cls.regInput}
                placeholder='Загузка аватара'
                type='file'
                id='avatarLoading'
                accept='image/png, image/jpeg, image/svg'
                onChange={handleImage}
            />
            <label
                className={cls.regLabel}
                htmlFor='avatarLoading'
            >
                <img src='/images/avatarDownload.svg' alt='avatarLoadingIcon'/>
                <span className={cls.regSpan}>{imageUrl || 'Загрузить аватар'}</span>
            </label>
        </>
    )
}