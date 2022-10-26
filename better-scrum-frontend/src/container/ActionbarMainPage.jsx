import Head from 'next/head';
import styles from '../styles/ActionBarMainPage.module.css';
import Divider from '../components/Divider';

function ActionBarMainPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>better scrum</title>
      </Head>
      <div className={styles.upper}>
        <select>
          <option value="department1">Department 1</option>
          <option value="department2">Department 2</option>
          <option value="department3">Department 3</option>
          <option value="department4">Department 4</option>
          <option value="department5">Department 5</option>
        </select>
        <Divider />
        <h2>Projekte:</h2>
        <button>
          + Projekt Hinzufügen
        </button>
        <p>Project Placeholder</p>
        <p>Project Placeholder</p>
        <p>Project Placeholder</p>
        <p>Project Placeholder</p>
      </div>
      <div className={styles.lower}>
        <p>Placeholder for User Settings</p>
      </div>
    </div>
  )
}

export default ActionBarMainPage;