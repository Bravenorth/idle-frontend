import './Home.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const {
    user,
    login,
    register,
    logout,
    setHasEnteredGame,
  } = useContext(UserContext);

  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(form.username, form.password);
      } else {
        await register(form.username, form.password);
      }
      // Ne pas rediriger ici, on attend le clic sur "Entrer dans le jeu"
    } catch {
      setMsg('Erreur lors de la connexion ou inscription');
    }
  };

  const handleEnterGame = () => {
    setHasEnteredGame(true);
    navigate('/game');
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1 className="home-title">Poudlard Idle</h1>

        {user ? (
          <>
            <p>Bienvenue, <strong>{user.username}</strong> !</p>
            <div className="home-button-group">
              <button onClick={handleEnterGame}>Entrer dans le jeu</button>
              <button onClick={logout}>Se déconnecter</button>
            </div>
          </>
        ) : (
          <div className="home-form-container">
            <h2>{mode === 'login' ? 'Connexion' : 'Inscription'}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="submit">
                {mode === 'login' ? 'Se connecter' : "S'inscrire"}
              </button>
              <p>{msg}</p>
            </form>

            <div className="home-button-group">
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? "Créer un compte" : 'Déjà un compte ? Se connecter'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
