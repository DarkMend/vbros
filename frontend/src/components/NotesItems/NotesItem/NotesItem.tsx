import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './NotesItem.module.scss'
import { useDrag } from 'react-dnd'

export default function NotesItem({ data, ...props }: { data: Object }) {
    const [, dragRef] = useDrag({
        type: 'item',
        item: data
    })

    return (
        <div className={styles['notes-item']} ref={dragRef}>
            <div className={styles['title']}>
                {data.title}
            </div>
            <div className={styles['description']}>
                <Skeleton height={17} />
                {data.description}
            </div>
            <div className={styles['deadline']}>
                {data.date}
            </div>
        </div>
    )
}