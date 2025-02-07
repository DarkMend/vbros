import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import cn from 'classnames'
import { X } from 'lucide-react';

export default function Modal() {
    return createPortal(
        <div className={cn(styles['modal'])}>
            <div className={styles['content']}>
                <div className={styles['content__head']}>
                    <div>
                        Настройки пользователя
                    </div>
                    <button className={styles['close']}>
                        <X />
                    </button>
                </div>
                <div className={styles['content__wrapper']}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quam cupiditate. Vero delectus repellat temporibus modi non asperiores placeat magni, dolorum excepturi cumque dolore! Vitae odit ad minima quibusdam itaque.
                </div>
            </div>
        </div>,
        document.body
    )
}