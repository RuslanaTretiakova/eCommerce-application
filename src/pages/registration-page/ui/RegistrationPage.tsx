import type { JSX } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DynamicForm from '../../../components/forms/DynamicForm.tsx';
import type { IFormData } from '../../../types/interfaces.ts';
import { registrationFields } from '../../../components/forms/registration/fieldsConfig.ts';
import { handleRegistration } from '../../../api/authorithation/handleRegistration.ts';

import './_registration-page.scss';

function RegistrationPage(): JSX.Element {
  const [status, setStatus] = useState<'initial' | 'submitting'>('initial');

  const onSubmit = async (formData: IFormData) => {
    setStatus('submitting');
    await handleRegistration(formData);
    setStatus('initial');
  };

  return (
    <div className="registration-page">
      <div className="registration-page__image">
        <img src="/img/registration/register_page.jpeg" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
        <div className="registration-page__link-to-auth">
          <p>Already have an account?</p>
          <Link to="/login" className="button button--login">
            Login
          </Link>
        </div>

        <DynamicForm<IFormData>
          fields={registrationFields}
          onSubmit={onSubmit}
          title="Registration"
          submitText={status === 'submitting' ? 'Registering...' : 'Sign Up'}
          showAddress
        />
      </div>
    </div>
  );
}

export default RegistrationPage;
