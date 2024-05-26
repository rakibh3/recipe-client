import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const image_hosting_key = import.meta.env.VITE_imageBB_Key;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddRecipes = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    if (res.data.success) {
      const recipeItem = {
        name: data.name,
        image: res.data.data.display_url,
        details: data.details,
        youtubeCode: data.video,
        country: data.country,
        category: data.category,
        creatorEmail: user?.email,
        watchCount: 0,
        purchasedBy: [],
      };

      const recipeRes = await axiosSecure.post('/recipes', recipeItem);
      if (recipeRes.data.success) {
        toast.success('Recipe added successfully');
        reset();
      }
    }
  };

  return (
    <div className="mx-4 sm:mx-auto  max-w-md space-y-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Create New Recipe</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to add a new recipe.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Recipe Name
            <span className="text-rose-500 dark:text-rose-400"> *</span>
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm dark:border-gray-600 dark:bg-rose-950 dark:text-rose-50 dark:placeholder-rose-400"
            placeholder="Enter recipe name"
            type="text"
            {...register('name', { required: 'Recipe name is required' })}
          />
          {errors.name && (
            <p className="text-rose-500 text-xs mt-2">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="image">
            Recipe Image
            <span className="text-rose-500 dark:text-rose-400"> *</span>
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm dark:border-gray-600 dark:bg-rose-950 dark:text-rose-50 dark:placeholder-rose-400"
            type="file"
            {...register('image', { required: 'Recipe image is required' })}
          />
          {errors.image && (
            <span className="text-sm text-rose-500">
              {errors.image.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="details">
            Recipe Details
            <span className="text-rose-500 dark:text-rose-400"> *</span>
          </label>
          <textarea
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm dark:border-gray-600 dark:bg-rose-950 dark:text-rose-50 dark:placeholder-rose-400 min-h-[120px]"
            placeholder="Enter recipe details"
            {...register('details', {
              required: 'Recipe details are required',
            })}
          />
          {errors.details && (
            <span className="text-sm text-rose-500">
              {errors.details.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="video">
            Embedded YouTube Video Code
            <span className="text-rose-500 dark:text-rose-400"> *</span>
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm dark:border-gray-600 dark:bg-rose-950 dark:text-rose-50 dark:placeholder-rose-400"
            placeholder="Enter YouTube video code"
            type="text"
            {...register('video', {
              required: 'YouTube video code is required',
            })}
          />
          {errors.video && (
            <span className="text-sm text-rose-500">
              {errors.video.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="country">
            Country
            <span className="text-rose-500 dark:text-rose-400"> *</span>
          </label>
          <input
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm dark:border-gray-600 dark:bg-rose-950 dark:text-rose-50 dark:placeholder-rose-400"
            placeholder="Enter country"
            type="text"
            {...register('country', { required: 'Country is required' })}
          />
          {errors.country && (
            <span className="text-sm text-rose-500">
              {errors.country.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="category">
            Category
            <span className="text-rose-500 dark:text-rose-400"> *</span>
          </label>
          <div className="relative">
            <select
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm dark:border-gray-600 dark:bg-rose-950 dark:text-rose-50"
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select category</option>
              <option value="appetizer">Appetizer</option>
              <option value="main-dish">Main Dish</option>
              <option value="dessert">Dessert</option>
              <option value="salad">Salad</option>
              <option value="soup">Soup</option>
            </select>
            {errors.category && (
              <span className="text-sm text-rose-500">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>

        <button
          className="w-full rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-600"
          type="submit"
          disabled={isSubmitting}
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};
export default AddRecipes;
