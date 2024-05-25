import { Toaster } from 'react-hot-toast';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <MainLayout />
    </div>
  );
}

export default App;
