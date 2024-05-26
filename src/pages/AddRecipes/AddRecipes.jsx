import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectCategory from '../../components/Form/SelectCategory';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string({
    required_error: 'Recipe name is required',
  }),
  image: z.any({
    required_error: 'Recipe image is required',
  }),
  details: z.string({
    required_error: 'Recipe details is required',
  }),
  video: z.string({
    required_error: 'YouTube video code is required',
  }),
  country: z.string({
    required_error: 'Country is required',
  }),
  category: z.string({
    required_error: 'Category is required',
  }),
});

const defaultValues = {
  name: '',
  image: '',
  details: '',
  video: '',
  country: '',
  category: '',
};

const AddRecipes = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const categoryOptions = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main-dish', label: 'Main Dish' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'salad', label: 'Salad' },
    { value: 'soup', label: 'Soup' },
  ];

  const onSubmit = (data) => {
    // Filter out default values that are not empty
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== defaultValues[key]
      )
    );
    if (Object.keys(filteredData).length === 0) {
      toast.error('Please fill out all required fields.');
    } else {
      console.log(filteredData);
      console.log(data);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to add a new recipe.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="name">
            Recipe Name<span className="text-rose-500"> *</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input id="name" placeholder="Enter recipe name" {...field} />
            )}
          />
          {errors.name && (
            <p className="text-rose-500">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">
            Recipe Image<span className="text-rose-500"> *</span>
          </Label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => <Input id="image" type="file" {...field} />}
          />
          {errors.image && (
            <p className="text-rose-500">{errors.image.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="details">
            Recipe Details<span className="text-rose-500"> *</span>
          </Label>
          <Controller
            name="details"
            control={control}
            render={({ field }) => (
              <Textarea
                className="min-h-[120px]"
                id="details"
                placeholder="Enter recipe details"
                {...field}
              />
            )}
          />
          {errors.details && (
            <p className="text-rose-500">{errors.details.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="video">
            Embedded YouTube Video Code<span className="text-rose-500"> *</span>
          </Label>
          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <Input
                id="video"
                placeholder="Enter YouTube video code"
                {...field}
              />
            )}
          />
          {errors.video && (
            <p className="text-rose-500">{errors.video.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="country">
            Country<span className="text-rose-500"> *</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input id="country" placeholder="Enter country" {...field} />
            )}
          />
          {errors.country && (
            <p className="text-rose-500">{errors.country.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">
            Category<span className="text-rose-500"> *</span>
          </Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectCategory
                value={field.value}
                onChange={field.onChange}
                options={categoryOptions}
                placeholder="Select category"
              />
            )}
          />
          {errors.category && (
            <p className="text-rose-500">{errors.category.message}</p>
          )}
        </div>
        <Button className="w-full" type="submit">
          Save Recipe
        </Button>
      </form>
    </div>
  );
};
export default AddRecipes;
