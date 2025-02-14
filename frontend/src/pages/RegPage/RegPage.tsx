import FormLayout from '../../components/FormLayout/FormLayout';
import MainButton from '../../components/MainButton/MainButton';
import MainInput from '../../components/MainInput/MainInput';
import styles from './RegPage.module.scss';
export default function RegPage() {
    return (
        <div className={styles['auth-page']}>
            <h1>Создайте аккаунт</h1>
            <FormLayout>
                <MainInput placeholder='Имя' errorMessage='Обосракаasdasdsadasda sdasdasdasdad' />
                <MainInput placeholder='ss'/>
                <MainInput placeholder='ff'/>
            </FormLayout>
            <div className={styles['transition-block']}>
                <p className={styles['transition-block__text']}>У вас есть аккаунт?</p>
                <MainButton theme='white'>Войти</MainButton>
            </div>
        </div>
    )
}