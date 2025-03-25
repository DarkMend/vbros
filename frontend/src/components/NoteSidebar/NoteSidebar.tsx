import styles from './NoteSidebar.module.scss';
import BackIcon from '../../../public/icons/back.svg'

export default function NoteSidebar() {
    return (
        <div className={styles.noteSidebar}>
            <div className={styles.content}>
                <div className={styles.header}>

                </div>
                <div className={styles.main}>

                </div>
            </div>
            <div className={styles.close}>
                <div className={styles.closeSvg}>
                    <BackIcon />
                </div>
                <div className={styles.closeText}>
                    Назад
                </div>
            </div>
        </div>
    )
}