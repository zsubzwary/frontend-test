import { Navigate, Outlet } from 'react-router-dom';
import { isUserLoggedIn } from './helper';

/**
 * Function to handle protected routes based on user authentication status.
 *
 * @return {JSX.Element} Either the Outlet component if user is authenticated or the Navigate component to redirect to login.
 */
export const ProtectedRoutes = () => {
  const auth = isUserLoggedIn();
  
return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}
