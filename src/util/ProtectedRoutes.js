import { Navigate, Outlet } from 'react-router-dom';
import { isUserLoggedIn } from './helper';

export const ProtectedRoutes = () => {
  const auth = isUserLoggedIn();
  
return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}
