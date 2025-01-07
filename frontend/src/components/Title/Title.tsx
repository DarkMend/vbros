import { ReactNode } from "react";
import styles from './Title.module.scss';

export default function Title({children, ...props}: {children: ReactNode}) {
    return (
        <div className={styles['title']} {...props}>
            {children}
        </div>
    )
}