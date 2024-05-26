import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import RecipesCard from './RecipesCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';

import { FilterIcon, SearchIcon } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Recipes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Get all recipes
  useEffect(() => {
    axiosPublic
      .get('/recipes')
      .then((response) => {
        const recipes = response?.data?.data;
        setRecipes(recipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  // const handleViewRecipe = async (id) => {
  //   if (!user) {
  //     return toast.error('Please login to view recipe details');
  //   }

  //   const recipe = recipes.find((recipe) => recipe.id === id);
  //   if (recipe.creatorEmail === user?.email) {
  //     navigate(`/recipe-details/${id}`);
  //   }
  //   if (user.coins < 10) {
  //     alert('You do not have enough coins. Please purchase more coins.');
  //     return navigate('/purchase-coins');
  //   }

  //   const confirmSpend = window.confirm(
  //     'Do you want to spend 10 coins to view this recipe?'
  //   );
  //   if (confirmSpend) {
  //     try {
  //       await updateUserCoins(user.id, -10);
  //       await updateUserCoins(recipe.creatorId, 1);
  //       await addUserToPurchasedByArray(recipe.id, user.email);
  //       await increaseRecipeWatchCount(recipe.id);

  //       toast.success('Successfully spent 10 coins to view the recipe');
  //       navigate(`/recipe-details/${id}`);
  //     } catch (error) {
  //       toast.error('An error occurred while processing your request');
  //       console.error('Error handling view recipe:', error);
  //     }
  //   }
  // };

  const handleViewRecipe = (id) => {
    if (user) {
      navigate(`/recipe-details/${id}`);
    }
  };

  // Function to handle search input recipe
  const handleSearchRecipe = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    console.log('Search:', value);
  };

  const handleSearchCountry = (event) => {
    const { value } = event.target;
    setSearchCountry(value);
    console.log('Search:', value);
  };

  const handleCategoryChange = (event) => {
    const { checked, id } = event.target;
    const category = id.replace('category-', '');

    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    }

    setSelectedCategories((updatedSelectedCategories) => {
      return updatedSelectedCategories;
    });
  };
  console.log(selectedCategories);

  return (
    <>
      {/*  Search and Filter Section Start */}
      <div className="bg-white dark:bg-gray-950 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="hidden md:block md:text-3xl font-bold">
              All Recipes
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                <Input
                  className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Search recipes..."
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchRecipe}
                />
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="flex items-center gap-2"
                      variant="outline"
                      type="checkbox"
                    >
                      <FilterIcon className="w-5 h-5" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[300px] p-4">
                    <div className="grid gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Category</h3>
                        <div className="grid gap-2">
                          <label className="flex items-center gap-2">
                            <input
                              id="category-breakfast"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Breakfast
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              id="category-lunch"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Lunch
                          </label>

                          <label className="flex items-center gap-2">
                            <input
                              id="category-dinner"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Dinner
                          </label>

                          <label className="flex items-center gap-2">
                            <input
                              id="category-dessert"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Dessert
                          </label>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Country</h3>
                        <div className="relative flex-1">
                          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />

                          <Input
                            className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Filter By Country"
                            type="text"
                            value={searchCountry}
                            onChange={handleSearchCountry}
                          />
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search and Filter Section End */}

      {recipes.map((recipe) => (
        <RecipesCard
          key={recipe._id}
          recipe={recipe}
          handleViewRecipe={handleViewRecipe}
        />
      ))}
    </>
  );
};
export default Recipes;
