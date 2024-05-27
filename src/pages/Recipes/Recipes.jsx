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
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Recipes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [coin, setCoin] = useState(0);

  // Get all recipes with search query, country and category
  useEffect(() => {
    axiosPublic
      .get('/recipes', {
        params: {
          searchTerm: searchQuery,
          country: searchCountry,
          category: selectedCategories.join(','),
        },
      })
      .then((response) => {
        const recipes = response?.data?.data;
        setRecipes(recipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic, searchCountry, searchQuery, selectedCategories]);

  // Get user coins info from the server
  const reloadCoinBalance = async () => {
    try {
      const res = await axiosSecure.get('/user');
      setCoin(res?.data?.data?.coin);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    let timeoutId;

    const getCoin = async () => {
      try {
        const res = await axiosSecure.get('/user');
        setCoin(res?.data?.data?.coin);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      timeoutId = setTimeout(getCoin, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [axiosSecure, user]);

  const handleViewRecipe = async (id) => {
    // if user Not Logged in
    if (!user) {
      return toast.error('Please login to view recipe details');
    }

    const recipe = recipes.find((recipe) => recipe._id === id);

    // Function to navigate to recipe details page and increment watch count
    const navigateToRecipeDetails = async () => {
      navigate(`/recipe-details/${id}`);
      try {
        await axiosSecure.patch('/increase-watch-count', { recipeId: id });
      } catch (error) {
        console.error('Error incrementing watch count:', error);
      }
    };

    // user Logged in and he is the creator of this recipe
    if (recipe.creatorEmail === user?.email) {
      toast.success('You are the creator of this recipe');
      await navigateToRecipeDetails();
      return;
    }

    // User already purchased this recipe before
    if (recipe.purchasedBy.includes(user.email)) {
      toast.success('You have already purchased this recipe');
      await navigateToRecipeDetails();
      return;
    }

    if (coin < 10) {
      toast.error('You do not have enough coins. Please purchase more coins.');
      return navigate('/purchase-coins');
    }

    const confirmSpend = window.confirm(
      'Do you want to spend 10 coins to view this recipe?'
    );
    if (confirmSpend) {
      await axiosSecure.patch('/update-user-coins', {
        reduceAmount: 10,
      });

      await axiosSecure.patch('/increase-creaton-coin', {
        recipeCreatorEmail: recipe.creatorEmail,
      });

      await axiosSecure.patch('/add-user-to-purchased-by-array', {
        recipeId: recipe?._id,
      });

      toast.success('Successfully spent 10 coins to view the recipe');
      await navigateToRecipeDetails();
      await reloadCoinBalance();
      return;
    }
  };

  // Function to handle search input recipe
  const handleSearchRecipe = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSearchCountry = (event) => {
    const { value } = event.target;
    setSearchCountry(value);
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
                              id="category-appetizer"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Appetizer
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              id="category-main-dish"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Main Dish
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              id="category-soup"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Soup
                          </label>

                          <label className="flex items-center gap-2">
                            <input
                              id="category-salad"
                              type="checkbox"
                              onChange={handleCategoryChange}
                            />
                            Salad
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
