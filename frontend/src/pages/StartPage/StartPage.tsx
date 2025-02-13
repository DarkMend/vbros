import { Link } from 'react-router-dom';
import MainButton from '../../components/MainButton/MainButton';
import styles from './StartPage.module.scss';
export default function StartPage() {

    return (
        <div className={styles['start-page']}>
            <div className={styles['start-page__head']}>
                <div className="logo">
                    <img src="/logo.svg" alt="Логтип сайта" />
                </div>
                <h1>
                    <span>Удобный и минималистичный инструмент</span>, помогающий быстро фиксировать задачи, расставлять приоритеты и не терять фокус.
                </h1>
            </div>
            <div className={styles['start-page__actions']}>
                <Link to={`/auth/login`}>
                    <MainButton>Войти</MainButton>
                </Link>
                <Link to={`/auth/reg`}>
                    <MainButton className={styles['button-reg']}>Зарегистрироваться</MainButton>
                </Link>
            </div>
        </div>
    )
}