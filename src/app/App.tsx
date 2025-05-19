import './App.scss';
import AuthenticationPage from '../pages/authorisation-page/AuthenticationPage';
import RegistratontionPageDraft from '../pages/authorisation-page/RegistrationPage-draft';
import '../assets/styles/normalize.css';
import '../assets/styles/global.scss';

function App() {
  return (
    <div>
      <h1>Hell o </h1>
      {/* <RegistrationPage /> */}
      <h2>auth</h2>
      <AuthenticationPage />
      <h2>Reg Draft</h2>
      <RegistratontionPageDraft />
    </div>
  );
}

export default App;
