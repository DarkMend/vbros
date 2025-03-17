import { IModalLayout } from './ModalLayout.props';
import styles from './ModalLayout.module.scss';
import { X } from 'lucide-react';
import { useModalStore } from '../../store/modalStore';

export default function ModalLayout({ icon, title, children, ...props }: IModalLayout) {
    const modalClose = useModalStore(state => state.closeModal);

    return (
        <div className={styles['modal-layout']} {...props}>
            <div className={styles['modal-layout__header']}>
                <div className={styles['title']}>
                    <div className={styles['icon']}>
                        {icon}
                    </div>
                    <p>
                        {title}
                    </p>
                </div>
                <div className={styles['close']} onClick={modalClose}>
                    <X />
                </div>
            </div>
            <div className={styles['modal-layout__content']}>
                {children}
            </div>
        </div>
    )
}