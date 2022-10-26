import styles from '../../styles/MainPage.module.css';
import ActionbarMainPage from '../../container/ActionbarMainPage';
import ContentMainPage from '../../container/ContentMainPage';

function MainPage() {
  return (
    <div className={styles.container}>
      <ActionbarMainPage />
      <ContentMainPage />
    </div>
  )
}

export default MainPage;