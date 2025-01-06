import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function MainLayout() {
    return (
        <div className={styles['main-layout']}>
            <Sidebar />
            <div className={styles['page']}>
                <Outlet />
            </div>
        </div>
    )
}