import styles from './AddNoteItem.module.scss';
import PlusIcon from '../../../../public/icons/plus.svg';

export default function AddNoteItem() {
    return (
        <div className={styles.noteItem}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <PlusIcon />
                </div>
                <div className={styles.text}>
                    Создать заметку
                </div>
            </div>
        </div>
    )
}