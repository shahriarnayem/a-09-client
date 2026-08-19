import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import AddTutor from '../pages/AddTutor/AddTutor';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyBookedSessions from '../pages/MyBookedSessions/MyBookedSessions';
import MyTutors from '../pages/MyTutors/MyTutors';
import NotFound from '../pages/NotFound/NotFound';
import Register from '../pages/Register/Register';
import Tutors from '../pages/Tutors/Tutors';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'tutors',
        element: <Tutors />,
      },
      {
        path: 'add-tutor',
        element: (
          <PrivateRoute>
            <AddTutor />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-tutors',
        element: (
          <PrivateRoute>
            <MyTutors />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-booked-sessions',
        element: (
          <PrivateRoute>
            <MyBookedSessions />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;