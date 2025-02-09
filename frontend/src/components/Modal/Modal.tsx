import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import cn from 'classnames'
import { X } from 'lucide-react';
import { useModalStore } from '../../store/modalStore';

export default function Modal() {
    const {isOpen, content, closeModal} = useModalStore();

    return createPortal(
        <div className={cn(styles['modal'], {
            [styles['active']]: isOpen
        })}>
            <div className={styles['content']}>
                <div className={styles['content__head']}>
                    <div>
                        Настройки пользователя
                    </div>
                    <button className={styles['close']} onClick={() => closeModal()}>
                        <X />
                    </button>
                </div>
                <div className={styles['content__wrapper']}>
                   {content}
                </div>
            </div>
        </div>,
        document.body
    )
}