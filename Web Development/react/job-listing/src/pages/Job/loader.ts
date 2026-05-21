import jobs from '../../assets/data/jobs.json';
import { LoaderFunctionArgs } from 'react-router';

const jobLoader = ({ params }: LoaderFunctionArgs) => {
  return jobs.find((job) => job.id === params.id) || null;
};

export default jobLoader;
