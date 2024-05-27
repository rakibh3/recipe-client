/* eslint-disable react/prop-types */
import { Eye, GlobeIcon, MailIcon, UserIcon } from 'lucide-react';
import { useLoaderData } from 'react-router-dom';

// const youtubeCode = I_6aMZwf9CU;
const RecipeDetails = () => {
  const recipeDetails = useLoaderData();

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">{recipeDetails?.data?.name}</h1>
          <div className="flex items-center gap-4 justify-between">
            <div className="flex">
              <div className="flex items-center gap-0.5">
                <Eye className="w-6 h-6" />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-2">
                {recipeDetails?.data?.watchCount} Views
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <MailIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Created by: {recipeDetails?.data?.creatorEmail}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GlobeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Country of Origin: {recipeDetails?.data?.country}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <img
            alt="Recipe Image"
            className="aspect-[4/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height="600"
            src="/src/assets/images/banner-image.jpg"
            width="800"
          />
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              height="315"
              src={`https://www.youtube.com/embed/${recipeDetails?.data?.youtubeCode}`}
              title="YouTube video player"
              width="560"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Purchased by: John Doe, Jane Smith, Bob Johnson, Sarah Lee
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <h2 className="font-bold text-2xl">Ingredients</h2>
          <ul className="list-disc pl-6 text-sm text-gray-500 dark:text-gray-400">
            <li>6-8 Granny Smith apples, peeled, cored and sliced</li>
            <li>1 cup white sugar</li>
            <li>1 teaspoon ground cinnamon</li>
            <li>1/2 teaspoon ground nutmeg</li>
            <li>1 (15 ounce) package refrigerated pie crusts</li>
            <li>2 tablespoons butter, cubed</li>
          </ul>
        </div>

        <div className="grid gap-2">
          <h2 className="font-bold text-2xl">Recipe Details</h2>
          <p className="list-decimal pl-6 text-sm text-gray-500 dark:text-gray-400">
            {recipeDetails?.data?.details}
          </p>
        </div>
      </div>
      <div className="grid gap-4 align-center">
        <h1>Suggestion Based On your visitig category</h1>
      </div>
    </div>
  );
};
export default RecipeDetails;
