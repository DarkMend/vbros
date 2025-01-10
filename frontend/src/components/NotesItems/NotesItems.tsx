import { INotesItems } from './Notes.props'
import NotesItem from './NotesItem/NotesItem'
import styles from './NotesItems.module.scss'
import cn from 'classnames'

export default function NotesItems({count, className, ...props}: INotesItems) {
    return (
        <div className={cn(styles['notes-items'], className)} {...props}>
            <div className={styles['notes-items__head']}>
                <div className={styles['name']}>
                    <div className={styles['img']}>
                        <img src="./icons/question-mark.svg" alt="" />
                    </div>
                    <p>Без статуса</p>
                </div>
                <div className={styles['actions']}>

                </div>
            </div>
            <div className={styles['notes-items__wrapper']}>
                {
                    count && Array.from({length: count}, (_, index) => <NotesItem key={index}/>)
                }
            </div>
        </div>
    )
}