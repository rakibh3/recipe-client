import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Recipes from '../pages/Recipes/Recipes';
import AddRecipes from '../pages/AddRecipes/AddRecipes';
import PrivateRoute from './PrivateRoute';

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
    ],
  },
]);

export default router;
