import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Recipes from '../pages/Recipes/Recipes';
import AddRecipes from '../pages/AddRecipes/AddRecipes';
import PrivateRoute from './PrivateRoute';
import RecipeDetails from '../pages/Recipes/RecipeDetails';
import Payment from '../pages/Payment/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/add-recipe',
        element: (
          <PrivateRoute>
            <AddRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: '/purchase-coins',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: '/recipe-details/:id',
        loader: ({ params }) =>
          fetch(
            `https://task--recipe-ac13aaec96a1.herokuapp.com/recipes/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
