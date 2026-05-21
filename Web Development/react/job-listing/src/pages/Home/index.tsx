import Hero from '../../components/Hero';
import HomePageCards from '../../components/HomePageCards';
import RecentJobs from '../../components/RecentJobs';
import ViewAllJobs from '../../components/ViewAllJobs';

const Home = () => {
  return (
    <>
      <Hero
        title="Become a React Dev"
        subtitle="Find the react job that fits your skill set"
      />
      <HomePageCards />
      <RecentJobs />
      <ViewAllJobs />
    </>
  );
};
export default Home;
