import { NavLink } from 'react-router';
import logo from '../../assets/images/logo.png';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.activeLink : styles.link;

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.logoLink} to="/">
        <img className={styles.logo} src={logo} alt="React Jobs" />
        <span className={styles.logoText}>React Jobs</span>
      </NavLink>
      <div className={styles.linkGroup}>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/jobs" className={linkClass}>
          Jobs
        </NavLink>
        <NavLink to="/add-job" className={linkClass}>
          Add Job
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
