import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";

import styles from '../styles/module/form-image.module.scss';
const IconsI = dynamic(() => import('./Utils/Icons'), { ssr: false })

const FormImage = ({ taget_id,callBack,width,height,className }) => {
    const [status, setStatus] = useState(false)
    const [images, setImages] = useState('')

    const handleFile = (e) => {
        const [file] = e.target.files
        if (file) {
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                setImages(fileReader.result)
                setStatus(true)
                if(callBack) callBack(fileReader.result)
            }
            fileReader.readAsDataURL(file)
        }
    }

    const handleRemove = () => {
        setStatus(false)
        setImages('')
    }

    return (
        <>
            <div className={`${styles.VgEnrxlAIa} ${(className) ? className : ''}`} style={{ width:`${(width) ? width : 120}px`,height:`${(height) ? height : 120}px` }}>
                {
                    (!status) ?
                    <label htmlFor={taget_id}>
                        <span className={styles.FYbvpqGPIN} />
                        <input onChange={(e) => handleFile(e)} type="file" name="" id={taget_id} />
                    </label>
                        :
                    <>
                        <div className={styles.ItomBROnwo}>
                            <Image width={10} height={10} src={images} alt="image preview" />
                            <div className={styles.ElXPtTeAac} onClick={(e) => handleRemove()}>
                                <IconsI icons="fa-regular fa-trash" />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default FormImage