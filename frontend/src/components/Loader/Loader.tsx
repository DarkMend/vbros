import styles from './Loader.module.scss'
import cn from 'classnames'

export default function Loader({theme, ...props}: {theme?: string}) {
    return (
        <div className={cn(styles['loader'], {
            [styles['white-theme']]: theme === 'white'
        })} {...props}>
            {/* <div className={styles['loader__bg']}>
            </div> */}
        </div>
    )
}