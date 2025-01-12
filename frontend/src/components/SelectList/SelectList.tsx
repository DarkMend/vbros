import { useState } from 'react';
import ArrowSvg from '../ArrowSvg/ArrowSvg';
import cn from 'classnames'
import styles from './SelectList.module.scss';

export default function SelectList() {
    
    const [selectActive, setSelectActive] = useState(false);

    const openSelect = () => {
        setSelectActive((state) => !state);
    }

    return (
        <div className={styles['select-list']}>
            <div className={cn(styles['select-list__head'], {
                [styles['active']]: selectActive
            })} onClick={openSelect}>
                <p>Последние</p>
                <div className={styles['img']}>
                    <ArrowSvg />
                </div>
            </div>
            <div className={cn(styles['select-list__wrapper'], {
                [styles['active']]: selectActive,
            })}>
                <h3>Сортировать по:</h3>
                <p>По алфавиту</p>
                <p>Последние</p>
            </div>
        </div>
    )
}