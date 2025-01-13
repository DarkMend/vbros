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
                <NotesItems name='Без статуса' icon={'./icons/question-mark.svg'}count={2}/>
                <div className={styles['notes__wrapper-status']}>
                    <NotesItems name='Планирование' iconColor='#63C3FF' className={styles['notes-items']} count={1}/>
                    <NotesItems name='Процесс' iconColor='#6BFF63' className={styles['notes-items']} count={2} />
                    <NotesItems name='Завершение' iconColor='#E4E4E4' className={styles['notes-items']} count={1}/>
                    
                    {/* <NotesItems name='Без статуса' iconColor='#E4E4E4' className={styles['notes-items']} count={6}/>
                    <NotesItems name='Без статуса' iconColor='#E4E4E4' className={styles['notes-items']} count={1}/>
                    <NotesItems name='Без статуса' iconColor='#E4E4E4' className={styles['notes-items']} count={1}/> */}
                </div>
            </div>
        </div>
    )
}