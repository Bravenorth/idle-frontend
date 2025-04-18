import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/game/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="*" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
