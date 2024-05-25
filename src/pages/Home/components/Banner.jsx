import { NavLink } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat bg-[url('/src/assets/images/banner-image.jpg')] ">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25 rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Let us find your
            <strong className="block font-extrabold text-rose-700">
              {' '}
              Favourite Recipe.{' '}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Explore Mouthwatering Recipes for Every Palate. Indulge Your Taste
            Buds with a Rich Array of Culinary Delights
          </p>

          <div className="mt-8 sm:ml-4 flex flex-wrap gap-4 text-center">
            <NavLink
              to="/recipes"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              See recipes
            </NavLink>

            <NavLink
              to="/add-recipe"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Add recipes
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
