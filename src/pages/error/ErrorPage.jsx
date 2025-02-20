import React from 'react';
import styles from './ErrorPage.module.css';
import ErrorIcon from '../../assets/error.png';

function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.flowerIcon}>
        <img src={ErrorIcon} alt="404" className={styles.flowerImg} />
      </div>
      <div className={styles.message}>찾을 수 없는 페이지입니다.</div>
      <div className={styles.subMessage}>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</div>
    </div>
  );
}
export default ErrorPage;