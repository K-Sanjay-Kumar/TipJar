import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import Footer from './constants/footer.jsx';
import App from './App.jsx'
import Explore from './components/explore.jsx'
import Profile from './components/profile.jsx'
import Login from './logins/login.jsx';
import ContactUs from './components/contact-us.jsx';
import Details from './components/details.jsx';
import Dashboard from './admin/dashboard.jsx';
import ManageUsers from './admin/manage-users.jsx';
import ManagePosts from './admin/manage-posts.jsx';
import ManagePostById from './admin/ManagePostById.jsx';
import AdminLogin from './admin/admin-login.jsx';
import ManageContactUs from './admin/manage-contactUs.jsx';

const router=createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/contact-us',
    element: <ContactUs />
  },
  {
    path: '/details/:id',
    element: <Details />
  },
  {
    path: '/Knowfinity/admin/dashboard',
    element: <Dashboard />
  },
  {
    path: '/Knowfinity/admin/users',
    element: <ManageUsers />
  },
  {
    path: '/Knowfinity/admin/posts',
    element: <ManagePosts />
  },
  {
    path: '/Knowfinity/admin/post/:id',
    element: <ManagePostById />
  },
  {
    path: '/Knowfinity/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/Knowfinity/admin/contactus',
    element: <ManageContactUs />
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <>
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}> */}
      {/* <Header /> */}
      <RouterProvider router={router} />
      <Footer />
    {/* </GoogleOAuthProvider> */}
  </>

)
