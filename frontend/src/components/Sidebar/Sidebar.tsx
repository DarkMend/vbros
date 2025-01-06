import MenuItem from './MenuItem/MenuItem'
import Profile from './Profile/Profile'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
    return (
        <div className={styles['sidebar']}>
            <div className={styles['sidebar__nav']}>
                <div className={styles['logo']}>
                    <div className={styles['img']}>
                        <img src="./sqrt.png" alt="" />
                    </div>
                    <h2>VBROS</h2>
                </div>
                <div className={styles['menu']}>
                    <MenuItem href='/' name='Заметки' />
                    <MenuItem href='/' name='Проекты' />
                    <MenuItem href='/' name='Архив' arrowActive={true} quantityActive={true} />
                    <MenuItem href='/' name='Поддержка' arrowActive={true} quantityActive={true} />
                </div>
            </div>
            <div className={styles['profile__wrapper']}>
                <Profile />
            </div>
        </div>
    )
}