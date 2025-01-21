import { INotesItems } from './NotesItems.props'
import NotesItem from './NotesItem/NotesItem'
import styles from './NotesItems.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import { useDrop } from 'react-dnd'

export default function NotesItems({name, count, className, icon, iconColor, ...props}: INotesItems) {
    const [visibleItem, setVisibleItem] = useState(false);

    const [ {isDragging}, dropRef] = useDrop({
        accept: 'item',
        drop(data){
            console.log(data);
        },
        collect: (monitor) => ({
            isDragging: monitor.isOver()
        })
    })

    return (
        <div className={cn(styles['notes-items'], className, {
            [styles['isDragging']]: isDragging
        })} {...props} ref={dropRef}>
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
                    <div className={cn(styles['actions__item'], styles['eye'])} onClick={() => setVisibleItem(state => !state)}>
                        <img src={!visibleItem ? './icons/eye.svg' : './icons/close-eye.svg' } alt="" />
                    </div>
                </div>
            </div>
            <div className={cn(styles['notes-items__wrapper'], {
                [styles['visible-items']]: visibleItem
            })}>
                {
                    count && Array.from({length: count}, (_, index) => <NotesItem key={index} data={{title: 'Title', description: 'Description', date: '16.01.2003'}}/>)
                }
            </div>
        </div>
    )
}