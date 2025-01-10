import ActionButton from '../../components/ActionButton/ActionButton'
import NotesItems from '../../components/NotesItems/NotesItems'
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
            <div className={styles['notes__wrapper']}>
                <NotesItems count={2}/>
                <div className={styles['notes__wrapper-status']}>
                    <NotesItems className={styles['notes-items']} count={1}/>
                    <NotesItems className={styles['notes-items']} count={2} />
                    <NotesItems className={styles['notes-items']} count={1}/>
                    <NotesItems className={styles['notes-items']} count={2}/>
                    <NotesItems className={styles['notes-items']} count={1}/>
                    <NotesItems className={styles['notes-items']} count={1}/>
                </div>
            </div>
        </div>
    )
}