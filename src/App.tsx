import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      // { path: 'products/:id', element: <ProductDetails /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
