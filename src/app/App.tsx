import './App.scss';
import AuthenticationPage from '../pages/authorisation-page/AuthenticationPage';
import RegistratontionPageDraft from '../pages/authorisation-page/RegistrationPage-draft';
import '../assets/styles/normalize.css';
import '../assets/styles/global.scss';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <Link to="/" />
        <Link to="/registration" />
      </nav>
      <Routes>
        <Route path="/" element={<RegistratontionPageDraft />} />
        <Route path="/registration" element={<AuthenticationPage />} />
      </Routes>
    </div>
  );
}

export default App;
