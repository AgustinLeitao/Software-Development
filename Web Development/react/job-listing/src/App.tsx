import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router';
import AddJob from './pages/AddJob';
import Home from './pages/Home';
import Job from './pages/Job';
import Jobs from './pages/Jobs';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import jobLoader from './pages/Job/loader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route index element={<Home />} />
      <Route path="jobs" element={<Jobs />} />
      <Route path="jobs/:id" element={<Job />} loader={jobLoader} />
      <Route path="add-job" element={<AddJob />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
