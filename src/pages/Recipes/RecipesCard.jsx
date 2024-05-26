/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HeartIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const RecipesCard = ({ recipe, handleViewRecipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  const {
    _id,
    name,
    image,
    creatorEmail,
    purchasedBy,
    country,
    // details,
    // youtubeCode,
    // category,
    // watchCount,
  } = recipe;

  return (
    <div>
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-md items-center">
        <img
          alt="Recipe Image"
          className="w-full h-[250px] object-cover rounded-lg"
          src={image}
          style={{
            aspectRatio: '600/400',
            objectFit: 'cover',
          }}
          width={600}
        />
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Purchased by:
              <span className="font-medium">{purchasedBy}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Creator:</span>{' '}
              <NavLink className="text-blue-500 hover:underline" to="">
                {creatorEmail}
              </NavLink>
            </p>
            <p>
              <span className="font-medium">Country of Origin:</span> {country}
            </p>
          </div>
          <div className="grid gap-6 lg:flex lg:gap-8">
            <Button onClick={() => handleViewRecipe(_id)} size="lg">
              View The Recipe
            </Button>

            {user && (
              <Button onClick={toggleFavorite} size="lg" variant="outline">
                {isFavorite ? (
                  <>
                    <HeartIcon
                      fill="#E4335A"
                      strokeWidth={0}
                      className="w-6 h-6 mr-2"
                    />
                    Remove Favorites
                  </>
                ) : (
                  <>
                    <HeartIcon className="w-6 h-6 mr-2 shadow-lg" />
                    Add to Favorites
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default RecipesCard;
