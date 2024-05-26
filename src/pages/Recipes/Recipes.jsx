import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HeartIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Recipes = () => {
  return (
    <>
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-md mt-14 items-center">
        <img
          alt="Recipe Image"
          className="w-full h-[250px] object-cover rounded-lg"
          src="/src/assets/images/banner-image.jpg"
          style={{
            aspectRatio: '600/400',
            objectFit: 'cover',
          }}
          width={600}
        />
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Homemade Pasta Carbonara</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Purchased by:
              <span className="font-medium">John Doe</span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Creator:</span>{' '}
              <NavLink className="text-blue-500 hover:underline" to="">
                chef@example.com
              </NavLink>
            </p>
            <p>
              <span className="font-medium">Country of Origin:</span>
              Italy
            </p>
          </div>
          <div className="flex gap-8">
            <Button size="lg">View The Recipe</Button>
            <Button size="lg" variant="outline">
              <HeartIcon className="w-5 h-5 mr-2" />
              Add to Favorites
            </Button>
          </div>
        </div>
      </Card>
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-md mt-14 items-center">
        <img
          alt="Recipe Image"
          className="w-full h-[250px] object-cover rounded-lg"
          src="/src/assets/images/banner-image.jpg"
          style={{
            aspectRatio: '600/400',
            objectFit: 'cover',
          }}
          width={600}
        />
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Homemade Pasta Carbonara</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Purchased by:
              <span className="font-medium">John Doe</span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Creator:</span>{' '}
              <a className="text-blue-500 hover:underline" href="#">
                chef@example.com
              </a>
            </p>
            <p>
              <span className="font-medium">Country of Origin:</span>
              Italy
            </p>
          </div>
          <div className="flex gap-8">
            <Button size="lg">View The Recipe</Button>
            <Button size="lg" variant="outline">
              <HeartIcon className="w-5 h-5 mr-2" />
              Add to Favorites
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
export default Recipes;
