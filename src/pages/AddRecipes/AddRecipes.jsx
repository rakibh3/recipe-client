/* eslint-disable react/prop-types */
import { GlobeIcon, MailIcon, StarIcon, UserIcon } from 'lucide-react';

// const youtubeCode = I_6aMZwf9CU;
const AddRecipes = ({ videoId = 'I_6aMZwf9CU' }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">Grandmas Homemade Apple Pie</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              (124 purchases)
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
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              width="560"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Purchased by: John Doe, Jane Smith, Bob Johnson, Sarah Lee
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created by: grandma@homemade.com
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Country of Origin: United States
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
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
          <h2 className="font-bold text-2xl">Instructions</h2>
          <ol className="list-decimal pl-6 text-sm text-gray-500 dark:text-gray-400">
            <li>Preheat oven to 425 degrees F (220 degrees C).</li>
            <li>
              In a large bowl, mix together the sliced apples, sugar, cinnamon,
              and nutmeg.
            </li>
            <li>
              Unroll one pie crust and place in a 9-inch pie dish. Pour the
              apple mixture into the crust and dot with the cubed butter.
            </li>
            <li>
              Unroll the remaining pie crust and place on top of the filling.
              Crimp and flute the edges to seal. Cut several slits in the top
              crust to allow steam to escape.
            </li>
            <li>
              Bake in the preheated oven for 15 minutes. Reduce temperature to
              350 degrees F (175 degrees C) and bake for an additional 30 to 40
              minutes, until the crust is golden brown and the filling is
              bubbly.
            </li>
            <li>
              Allow to cool completely before serving, about 4 hours. Serve with
              vanilla ice cream if desired.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
export default AddRecipes;
