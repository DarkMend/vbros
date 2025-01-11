import { INotesItems } from './Notes.props'
import NotesItem from './NotesItem/NotesItem'
import styles from './NotesItems.module.scss'
import cn from 'classnames'

export default function NotesItems({name, count, className, icon, iconColor, ...props}: INotesItems) {
    return (
        <div className={cn(styles['notes-items'], className)} {...props}>
            <div className={styles['notes-items__head']}>
                <div className={styles['name']}>
                    <div className={styles['img']}>
                        {
                            icon ? <img src={icon} alt="" /> : <div className={styles['icon-color']} style={{background: iconColor}}></div>
                        }
                        
                    </div>
                    <p>{name}</p>
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