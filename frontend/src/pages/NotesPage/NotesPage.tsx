import ActionButton from '../../components/ActionButton/ActionButton'
import Title from '../../components/Title/Title'
import styles from './NotesPage.module.scss'

export default function NotesPage() {
    return (
        <div className={styles['notes']}>
            <div className={styles['head']}>
                <Title>Заметки</Title>
                <div className={styles['actions']}>
                    <ActionButton>
                        <img src="./sqrt.png" alt="" />
                    </ActionButton>
                </div>
            </div>
        </div>
    )
}