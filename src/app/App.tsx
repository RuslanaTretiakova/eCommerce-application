import './App.scss';
import AuthenticationPage from '../pages/authorisation-page/AuthenticationPage';
import RegistratontionPageDraft from '../pages/authorisation-page/RegistrationPage-draft';
import '../assets/styles/normalize.css';
import '../assets/styles/global.scss';
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav>
        <Link to='/'></Link> 
        <Link to='/registration'></Link>
      </nav>

      <Routes>
        <Route path="/" element={<RegistratontionPageDraft />}/>
        <Route path="/registration" element={<AuthenticationPage />}/>
      </Routes>
      {/* // <h1>Hell o </h1> */}
      // {/* <RegistrationPage /> */}
      {/* // <h2>auth</h2> */}
      {/* // <AuthenticationPage /> */}
      {/* // <h2>Reg Draft</h2> */}
      {/* // <RegistratontionPageDraft /> */}
    </div>
  );
}

export default App;
