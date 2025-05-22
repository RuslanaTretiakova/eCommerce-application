import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import type { IFormData } from '../../../types/interfaces';
import DynamicForm from '../../../components/forms/DynamicForm';
import { registrationFields } from '../../../components/forms/registration/fieldsConfig';

import './_registration-page.scss';

function RegistrationPage(): JSX.Element {
  const handleRegistration = async (formData: IFormData) => {
    console.log(formData);
  };

  return (
    <div className="registration-page">
      <div className="registration-page__image">
        <img src="./src/assets/images/register_page.jpeg.png" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
        <div className="registration-page__link-to-auth">
          <p> Already have an account?</p>
          <Link to="/login" className="button button--login">
            Login
          </Link>
        </div>
        <DynamicForm<IFormData>
          fields={registrationFields}
          onSubmit={handleRegistration}
          title="Registration"
          submitText="Sign Up"
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
