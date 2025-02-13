import styles from './MainInput.module.scss'
import { IMainInput } from './MainInput.props'

export default function MainInput({type = 'text', ...props}: IMainInput) {
    return (
        <div className={styles['input__wrapper']} >
            <input type={type} {...props}/>
        </div>
    )
}