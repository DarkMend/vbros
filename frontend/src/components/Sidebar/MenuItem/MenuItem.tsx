import { Link } from "react-router-dom";
import styles from './MenuItem.module.scss'
import { IMenuItem } from "./MenuItem.props";
import ArrowSvg from "../../ArrowSvg/ArrowSvg";
import { MouseEventHandler, useState } from "react";
import cn from 'classnames'

export default function MenuItem({ href, arrowActive = false, quantityActive = false, name, ...props }: IMenuItem) {
    const [listActive, setListActive] = useState(false);

    const expandList: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setListActive(state => !state);
    }

    return (
        <Link to={href}>
            <div className={styles['nav']} {...props}>
                <div className={styles['nav__main']}>
                    <div className={cn(styles['arrow'], {
                        [styles['active']]: listActive,
                        [styles['none']]: arrowActive
                    })} onClick={expandList}>
                        <ArrowSvg className={styles['arrow_svg']} />
                    </div>
                    <div className={styles['nav__href']}>
                        <div className={styles['icon']}>
                            <img src="./sqrt.png" alt="" />
                        </div>
                        <div className={styles['text']}>
                            {name}
                        </div>
                    </div>
                </div>
                <div className={cn(styles['quantity'], {
                    [styles['none']]: quantityActive
                })}>
                    24
                </div>
            </div>
            <div className={cn(styles['nav__list'], {
                [styles['active']]: listActive
            })}>
                <div className={styles['nav__href']}>
                    <div className={styles['icon']}>
                        <img src="./sqrt.png" alt="" />
                    </div>
                    <div className={styles['text']}>
                        Заметки
                    </div>
                </div>
                <div className={styles['nav__href']}>
                    <div className={styles['icon']}>
                        <img src="./sqrt.png" alt="" />
                    </div>
                    <div className={styles['text']}>
                        Заметки
                    </div>
                </div>
            </div>
        </Link>
    )
}