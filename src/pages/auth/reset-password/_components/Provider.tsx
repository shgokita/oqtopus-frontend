import { createContext, useContext, useState } from 'react';

interface context {
  email: string;
  setEmail: (email: string) => void;
}

const useDefault = (): context => {
  const [email, setEmail] = useState('');
  return { email, setEmail };
};

const resetPasswordContext = createContext({} as context);

export const useResetPassword = () => useContext(resetPasswordContext);

export const ResetPasswordProvider = ({ children }: React.PropsWithChildren) => {
  const context = useDefault();
  return <resetPasswordContext.Provider value={context}>{children}</resetPasswordContext.Provider>;
};
