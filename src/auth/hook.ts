import { useContext } from 'react';
import { UseAuth, AuthContext } from './Provider';

export const useAuth = (): UseAuth => {
  return useContext(AuthContext);
};
