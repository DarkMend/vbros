import styles from './LoginPage.module.scss';
export default function LoginPage() {
    return (
        <div className={styles['login']}>
            <h1>Страница аутентификации</h1>
            <form action="">
                <input type="text" />
                <input type="text" />
                <button>Войти</button>
            </form>
        </div>
    )
}