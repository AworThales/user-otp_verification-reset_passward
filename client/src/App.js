import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Username from './components/Username';
import Register from './components/Register';
import Password from './components/Password';
import Profile from './components/Profile';
import Reset from './components/Reset';
import Recovery from './components/Recovery';
import PageNotFound from './components/PageNotFound';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Username></Username>
    },
    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: '/password',
      element: <Password></Password>
    },
    {
      path: '/profile',
      element: <Profile></Profile>
    },
    {
      path: '/reset',
      element: <Reset></Reset>
    },
    {
      path: '/recovery',
      element: <Recovery></Recovery>
    },
    {
      path: '*',
      element: <PageNotFound></PageNotFound>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
