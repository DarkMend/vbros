import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
    return (
        <div className={styles['auth-layout']}>
            <div className={styles['page']}>
                <div className={styles['logo']}>
                    <img src="/logo.svg" alt="" />
                </div>
                <Outlet />
            </div>
        </div>
    )
}