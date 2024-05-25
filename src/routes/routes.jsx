import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Recipes from '../pages/Recipes';
import AddRecipes from '../pages/AddRecipes';
import Home from '../pages/Home';

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
        element: <AddRecipes />,
      },
    ],
  },
]);

export default router;
