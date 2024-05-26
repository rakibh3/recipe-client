import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router';

import Spinner from '../components/Spinner/Spinner';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !toastShownRef.current) {
      toast.error('You must be logged in for this action.');
      toastShownRef.current = true;
    }
  }, [loading, user]);

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
