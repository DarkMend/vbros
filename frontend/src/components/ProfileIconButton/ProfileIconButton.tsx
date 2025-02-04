import { ReactNode } from 'react'
import styles from './ProfileIconButton.module.scss'

export default function ProfileIconButton({children, ...props}: {children: ReactNode}) {
    return (
        <button {...props} className={styles['button']}>
            {children}
        </button>
    )
}