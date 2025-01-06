import MenuItem from './MenuItem/MenuItem'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
    return (
        <div className={styles['sidebar']}>
            <div className={styles['logo']}>
                <div className={styles['img']}>
                    <img src="./sqrt.png" alt="" />
                </div>
                <h2>VBROS</h2>
            </div>
            <div className={styles['menu']}>
                <MenuItem href='/' arrowActive={true} quantityActive={true}/>
                <MenuItem href='/' />
                <MenuItem href='/' />

            </div>
            <div className={styles['profile__wrapper']}>
                <div className={styles['premium']}>

                </div>
                <div className={styles['profile']}>

                </div>
            </div>
        </div>
    )
}