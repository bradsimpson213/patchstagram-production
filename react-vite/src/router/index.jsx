import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Landing from '../components/Landing';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />

  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    path: "signup",
    element: <SignupFormPage />,
  },
  {
    element: <Layout />,
    children: [
      // {
      //   path: 'feed',
      //   element: <Feed />
      // },
    ],
  },
]);