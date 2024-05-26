import CountUp from 'react-countup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

const SuccessStories = () => {
  const [recipesCount, setRecipesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get('/total-recipes').then((response) => {
      setRecipesCount(response?.data?.data);
    });

    axiosPublic.get('/total-users').then((response) => {
      setUsersCount(response?.data?.data);
    });
  }, [axiosPublic]);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
        <div className="flex justify-center items-center space-x-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              <CountUp end={recipesCount} duration={3} separator="," />
            </h3>
            <p className="text-lg text-gray-600">Recipes to Explore</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              <CountUp end={usersCount} duration={2} separator="," />
            </h3>
            <p className="text-lg text-gray-600">Passionate Food Enthusiasts</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SuccessStories;
