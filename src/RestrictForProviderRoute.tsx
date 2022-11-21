import { Navigate, Route, useLocation } from 'react-router-dom';
import { useProfile } from './hooks/profile';
import NotFound from './Pages/NotFound';
import Loading from './components/Loading';

export const RestrictForProviderRoute = ({
  children
}: {
  children: JSX.Element;
}) => {
  let location = useLocation();

  const { isReady, isAuthenticated, isServiceProvider } = useProfile();

  if (!isReady) {
    return <Loading />;
  }

  if (isAuthenticated && isServiceProvider) {
    return <Navigate to='/provider' state={{ from: location }} />;
  }

  return children;
};
