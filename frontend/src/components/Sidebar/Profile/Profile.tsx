import { useModalStore } from '../../../store/modalStore'
import ProfileIconButton from '../../ProfileIconButton/ProfileIconButton'
import styles from './Profile.module.scss'

export default function Profile() {
    const {openModal} = useModalStore();

    const handleOpenModal = () => {
        const modalContent = (
            <div>
                adasdd
            </div>
        );

        console.log('a')

        openModal(modalContent);
    }

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
                    <ProfileIconButton onClick={handleOpenModal}>
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