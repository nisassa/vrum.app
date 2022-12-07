import { Navigate, Route, useLocation } from 'react-router-dom';
import { useProfile } from './hooks/profile';
import NotFound from './Pages/NotFound';
import Loading from './components/Loading';

export const PrivateRoute = ({
  children,
  mustBeProvider
}: {
  children: JSX.Element;
  mustBeProvider: Boolean;
}) => {
  let location = useLocation();

  const { isReady, isAuthenticated, isServiceProvider } = useProfile();

  if (!isReady) {
    return <Loading style='h-screen' />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthenticated && mustBeProvider && !isServiceProvider) {
    return <NotFound />;
  }

  if (isAuthenticated && !mustBeProvider && isServiceProvider) {
    return <NotFound />;
  }

  return children;
};

export const RestrictedForProviderRoute = ({
  children
}: {
  children: JSX.Element;
}) => {
  let location = useLocation();

  const { isReady, isAuthenticated, isServiceProvider } = useProfile();

  if (!isReady) {
    return <Loading style='h-screen' />;
  }

  if (isAuthenticated && isServiceProvider) {
    return <Navigate to='/provider' state={{ from: location }} />;
  }

  return children;
};
