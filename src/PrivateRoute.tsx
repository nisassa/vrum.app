import { Navigate, Route, useLocation } from 'react-router-dom';
import { useProfile } from "./hooks/profile";
import NotFound from "./Pages/NotFound";

export const PrivateRoute = ({children, isProvider}: {
    children: JSX.Element;
    isProvider: Boolean
}) => {
    let location = useLocation();

    const { isReady, isAuthenticated, isServiceProvider } = useProfile();

    if (! isReady) {
        return <p className="container">Loading..</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (isAuthenticated && isProvider && !isServiceProvider) {
        return <NotFound />;
    }

    if (isAuthenticated && !isProvider && isServiceProvider) {
        return <NotFound />;
    }

    return children;
};