import styles from './ProfileIconButton.module.scss'
import { IProfileIconButton } from './ProfileIconButton.props'

export default function ProfileIconButton({children, ...props}: IProfileIconButton) {
    return (
        <button {...props} className={styles['button']}>
            {children}
        </button>
    )
}