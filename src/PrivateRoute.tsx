import { Navigate, Route, useLocation } from 'react-router-dom';
import { useProfile } from './hooks/profile';
import NotFound from './Pages/NotFound';
import Loading from './components/Loading';

export const PrivateRoute = ({
  children,
  mustBeProvider,
  mustBeProviderManager
}: {
  children: JSX.Element;
  mustBeProvider: Boolean;
  mustBeProviderManager: Boolean;
}) => {
  let location = useLocation();

  const {
    isReady,
    isAuthenticated,
    isServiceProvider,
    isServiceProviderManager
  } = useProfile();

  if (isReady !== true) {
    return <Loading style='h-screen' />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthenticated && mustBeProvider && !isServiceProvider ) {
    return <NotFound />;
  }

  if (isAuthenticated && !mustBeProvider && isServiceProvider) {
    return <NotFound />;
  }
  if (isAuthenticated && mustBeProviderManager && !isServiceProviderManager) {
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

  if (isReady !== true) {
    return <Loading style='h-screen' />;
  }

  if (isAuthenticated && isServiceProvider) {
    return <Navigate to='/provider' state={{ from: location }} />;
  }

  return children;
};
