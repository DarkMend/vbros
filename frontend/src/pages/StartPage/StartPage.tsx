import styles from './StartPage.module.scss';
export default function StartPage() {
    return (
        <div className={styles['start-page']}>
            <div className={styles['start-page__head']}>
                <div className="logo">
                    <img src="./logo.svg" alt="Логтип сайта" />
                </div>
                <h1>
                    <span>Удобный и минималистичный инструмент</span>, помогающий быстро фиксировать задачи, расставлять приоритеты и не терять фокус.
                </h1>
            </div>
            <div className={styles['start-page__actions']}>

            </div>
        </div>
    )
}