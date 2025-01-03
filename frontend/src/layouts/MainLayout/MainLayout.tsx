import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

export default function MainLayout() {
    return (
        <div className={styles['main-layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['logo']}>
                    <div className={styles['img']}>
                        <img src="./sqrt.png" alt="" />
                    </div>
                    <h2>VBROS</h2>
                </div>
                <div className={styles['menu']}>
                    <a href="">qweq</a>
                    <a href="">123123</a>
                    <a href="">qwe</a>
                </div>
                <div className={styles['profile__wrapper']}>
                    <div className={styles['premium']}>

                    </div>
                    <div className={styles['profile']}>

                    </div>
                </div>
            </div>
            <div className={styles['page']}>
                <Outlet />
            </div>
        </div>
    )
}