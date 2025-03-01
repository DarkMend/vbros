import { useModalStore } from '../../../store/modalStore'
import ProfileIconButton from '../../ProfileIconButton/ProfileIconButton'
import styles from './Profile.module.scss'
import ProfileSettings from './ProfileSettings/ProfileSettings';

export default function Profile() {
    // const openModal = useModalStore(state => state.openModal);

    return (
        <>
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
                    <ProfileIconButton >
                        <img src="./icons/menu-select.svg" alt="октрыть меню" />
                    </ProfileIconButton>
                    <ProfileSettings />
                </div>
            </div>
        </>
    )
}