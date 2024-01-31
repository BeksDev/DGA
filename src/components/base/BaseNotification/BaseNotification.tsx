import styles from "./BaseNotification.module.css";

interface BaseNotificationProps {
  imgUrl?: string;
  notificationTitle?: string;
  notification?: string;
}

const BaseNotification: React.FC<BaseNotificationProps> = ({ imgUrl, notificationTitle, notification }) => {
  return (
    <div className={styles["notification-wrapper"]}>
      <img
        src={imgUrl}
        alt={notificationTitle}
      />
      <div>
        <h1 className={styles['notification-title']}>{notificationTitle}</h1>
        <p className={styles["notification-paragraph"]}>{notification}</p>
      </div>
      <img className="cursor-pointer" src="assets/ic_close.svg" alt="close" />
    </div>
  );
};

export default BaseNotification;
