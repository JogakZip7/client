import React from 'react';

function ErrorPage() {
  return (
    <div style={styles.container}>
      <div style={styles.errorCode}>404</div>
      <div style={styles.flowerIcon}>
        <img src="flower-icon.png" alt="Flower" style={{ width: '50px', height: '50px' }} />
      </div>
      <div style={styles.message}>찾을 수 없는 페이지입니다.</div>
      <div style={styles.subMessage}>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FAFAFA',
    textAlign: 'center',
    fontFamily: "'ABeeZee', sans-serif",
    color: '#282828',
  },
  errorCode: {
    fontSize: '100px',
    fontWeight: 'bold',
    color: '#282828',
  },
  flowerIcon: {
    marginTop: '10px',
  },
  message: {
    fontSize: '18px',
    fontWeight: '400',
    marginTop: '20px',
    color: '#282828',
  },
  subMessage: {
    fontSize: '14px',
    color: '#B8B8B8',
    marginTop: '10px',
  },
};

export default ErrorPage;
