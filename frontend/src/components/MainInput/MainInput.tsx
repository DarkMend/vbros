import { forwardRef } from 'react'
import styles from './MainInput.module.scss'
import { IMainInput } from './MainInput.props'
import cn from 'classnames'

const MainInput = forwardRef<HTMLInputElement, IMainInput>(({ type = 'text', placeholder, errorMessage, ...props }, ref) => {
    return (
        <div className={styles['input__wrapper']} >
            <input type={type} {...props} ref={ref} placeholder={placeholder} className={cn(styles['input'], {
                [styles['error']]: errorMessage && true
            })} />
            <div className={cn(styles['error-message'], {
                [styles['active']]: errorMessage && true
            })}>
                <div className={styles['error-icon']}>
                    <img src="/icons/error-icon.svg" alt="ошибка" />
                </div>
                <p className={styles['error-text']}>
                    {errorMessage}
                </p>
            </div>
        </div>
    )
})

export default MainInput;