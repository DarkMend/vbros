import ProfileIconButton from '../../ProfileIconButton/ProfileIconButton'
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
                        <img src="./icons/circle.svg" alt="" />
                    </div>
                    <div className={styles['name']}>
                        Аяз
                    </div>
                </div>
                <div className={styles['arrow']}>
                    <ProfileIconButton>
                        <img src="./icons/gear.svg" alt="" />
                    </ProfileIconButton>
                    <ProfileIconButton>
                        <img src="./icons/exit.svg" alt="" />
                    </ProfileIconButton>
                </div>
            </div>
        </>
    )
}