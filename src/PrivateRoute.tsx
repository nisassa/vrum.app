import { Navigate, Route, useLocation } from 'react-router-dom';
import { useProfile } from "./hooks/profile";
import NotFound from "./Pages/NotFound";

export const PrivateRoute = ({children, mustBeProvider}: {
    children: JSX.Element;
    mustBeProvider: Boolean
}) => {
    let location = useLocation();

    const { isReady, isAuthenticated, isServiceProvider } = useProfile();

    if (! isReady) {
        return <p className="container">Loading..</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (isAuthenticated && mustBeProvider && !isServiceProvider) {
        return <NotFound />;
    }

    if (isAuthenticated && !mustBeProvider && isServiceProvider) {
        return <NotFound />;
    }

    return children;
};