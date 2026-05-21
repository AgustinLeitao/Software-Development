import styles from './HomePageCards.module.scss';
import { Link } from 'react-router';
import Card from '../Card';

const HomePageCards = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.grid} ${styles.gridMd}`}>
          <Card>
            <h2 className={styles.title}>For Developers</h2>
            <p className={styles.description}>
              Browse our React jobs and start your career today
            </p>
            <Link
              to="/jobs"
              className={`${styles.cardLink} ${styles.cardLinkBlack}`}
            >
              Browse Jobs
            </Link>
          </Card>
          <Card bg="bg-indigo-100">
            <h2 className={styles.title}>For Employers</h2>
            <p className={styles.description}>
              List your job to find the perfect developer for the role
            </p>
            <Link
              to="/add-job"
              className={`${styles.cardLink} ${styles.cardLinkIndigo}`}
            >
              Add Job
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomePageCards;
