import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './NotesItem.module.scss'

export default function NotesItem() {
    return (
        <div className={styles['notes-item']}>
            <div className={styles['title']}>
                Title
            </div>
            <div className={styles['description']}>
                <Skeleton height={17}/>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque vitae, fugit doloribus incidunt sit itaque, necessitatibus laudantium cum, at quae tenetur veniam dignissimos provident natus? Distinctio consectetur qui nam eveniet?
            </div>
            <div className={styles['deadline']}>
                16.01.2003
            </div>
        </div>
    )
}