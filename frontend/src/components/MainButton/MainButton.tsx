import styles from './MainButton.module.scss';
import { IMainButton } from './MainButton.props';
import cn from 'classnames'

export default function MainButton({ children, className, theme, ...props }: IMainButton) {
    return (
        <button className={cn(styles['button'], {
            [styles['white-theme']]: theme === 'white',
        }, className)} {...props}>
            <div className={styles['button__wrapper']}>
                <p>
                    {children}
                </p>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['icon']}>
                    <path d="M0.351059 10.9335C0.156974 10.7381 0.157532 10.4225 0.352306 10.2277L4.22683 6.35317C4.42194 6.15806 4.42212 5.84177 4.22722 5.64645L0.352782 1.76355C0.157884 1.56823 0.158056 1.25194 0.353168 1.05683L1.05645 0.353553C1.25171 0.158291 1.56829 0.158291 1.76355 0.353553L7.05645 5.64645C7.25171 5.84171 7.25171 6.15829 7.05645 6.35355L1.7648 11.6452C1.56905 11.8409 1.25151 11.8404 1.05645 11.6439L0.351059 10.9335Z" fill="black" className={styles['svg-icon']} />
                </svg>
            </div>
        </button>
    )
}