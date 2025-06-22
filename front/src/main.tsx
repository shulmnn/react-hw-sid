import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import HomePage from '~/pages/HomePage';
import GeneratorPage from '~/pages/GeneratorPage';
import HistoryPage from '~/pages/HistoryPage';
import Layout from './components/Layout';

import '~/styles/colors.css';
import '~/styles/reset.css';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/generator',
        element: <GeneratorPage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
