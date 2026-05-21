import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar';

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Main;
