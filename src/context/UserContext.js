import { createContext, useState, useEffect } from 'react';
import API from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasEnteredGame, setHasEnteredGame] = useState(
    localStorage.getItem('hasEnteredGame') === 'true'
  );
  const [isLoading, setIsLoading] = useState(true); // ← Ajout ici

  // Récupère l'utilisateur avec le token
  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false); // ← Fin du chargement
    }
  };

  const login = async (username, password) => {
    const res = await API.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    await fetchUser();
  };

  const register = async (username, password) => {
    const res = await API.post('/auth/register', { username, password });
    localStorage.setItem('token', res.data.token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hasEnteredGame');
    setUser(null);
    setHasEnteredGame(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    } else {
      setIsLoading(false); // ← Aucun token = pas besoin de fetch
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hasEnteredGame', hasEnteredGame.toString());
  }, [hasEnteredGame]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        hasEnteredGame,
        setHasEnteredGame,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
