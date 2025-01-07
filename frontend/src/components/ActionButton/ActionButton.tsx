import { ReactNode } from "react";
import styles from './ActionButton.module.scss';

export default function ActionButton({children, ...props}: {children: ReactNode}) {
    return (
        <button {...props} className={styles['button']}>
            {children}
        </button>
    )
}