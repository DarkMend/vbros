import styles from './ProfileSettings.module.scss';
import ProfileSettingsItem from './ProfileSettingsItem/ProfileSettingsItem';
import AccountIcon from './../../../../../public/icons/account.svg';


export default function ProfileSettings() {
    return (
        <div className={styles['profile-settings']}>
            <ProfileSettingsItem name='Аккаунт' icon={<AccountIcon />} />
        </div>
    ) 
}