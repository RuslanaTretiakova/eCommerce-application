import type { JSX } from 'react';
import RegistrationForm from '../../../components/forms/registration/RegistrationForm';

import './_registration-page.scss';

function RegistrationPage(): JSX.Element {
  return (
    <div className="registration-page">
      <div className="registration-page__image">
        <img src="./src/assets/images/register_page.jpeg.png" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
