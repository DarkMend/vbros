import MainButton from '../../components/MainButton/MainButton';
import styles from './RegPage.module.scss';
export default function RegPage() {
    return (
        <div className={styles['auth-page']}>
            <h1>Создайте аккаунт</h1>
            <form action="">
                <input type="text" />
            </form>
            <MainButton theme='white' >Зарегистрироваться</MainButton>
            <div className={styles['transition-block']}>
                <p className={styles['transition-block__text']}>У вас есть аккаунт?</p>
                <MainButton theme='white'>Войти</MainButton>
            </div>
        </div>
    )
}