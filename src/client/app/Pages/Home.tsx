import TrendingShowsDisplay from '../components/TrendingShowsDisplay';
import YourAnimeDisplay from '../components/YourAnimeDisplay';
import React from 'react';

const Home = () => {
  return (
    <div>
      <TrendingShowsDisplay />
      <YourAnimeDisplay />
    </div>
  );
};

export default Home;
