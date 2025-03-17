import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import cn from 'classnames'
import { useModalStore } from '../../store/modalStore';
import { MouseEvent, useRef } from 'react';

export default function Modal() {
    const {isOpen, content, closeModal} = useModalStore();
    const modalRef = useRef(null);

    const handleCloseModal = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }

    return createPortal(
        <div className={cn(styles['modal'], {
            [styles['active']]: isOpen
        })} ref={modalRef} onClick={handleCloseModal}>
            {content}
        </div>,
        document.body
    )
}