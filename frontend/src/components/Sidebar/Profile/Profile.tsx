import ArrowSvg from '../../ArrowSvg/ArrowSvg'
import styles from './Profile.module.scss'

export default function Profile() {
    return (
        <>
            <div className={styles['premium']}>
                <p>Премиум</p>
                <button>Купить</button>
            </div>
            <div className={styles['profile']}>
                <div className={styles['profile__user']}>
                    <div className={styles['ava']}>
                        <img src="./circle.svg" alt="" />
                    </div>
                    <div className={styles['name']}>
                        Аяз
                    </div>
                </div>
                <div className={styles['arrow']}>
                    <ArrowSvg />
                </div>
            </div>
        </>
    )
}