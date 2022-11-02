import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authRequest } from 'store/auth/authAction';
import { authSlice } from 'store/auth/authSlice';

export const useAuth = () => {
  const auth = useSelector(state => state.auth.data);
  const token = useSelector(state => state.token.token);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRequest());
  }, [token]);

  const clearAuth = () => dispatch(authSlice.actions.authLogout());
  return [auth, loading, clearAuth];
};
