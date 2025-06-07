import type { JSX } from 'react';
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import DynamicForm from '../../../components/forms/DynamicForm.tsx';
import type { IFormData } from '../../../types/interfaces.ts';
import { registrationFields } from '../../../components/forms/registration/fieldsConfig.ts';
import { handleRegistration } from '../../../api/authorithation/handleRegistration.ts';
import { useAuth } from '../../../api/authorithation/AuthToken.tsx';

import './_registration-page.scss';

function RegistrationPage(): JSX.Element {
  const navigate = useNavigate();
  debugger;
  const { isAnonymous, setToken } = useAuth();

  const [status, setStatus] = useState<'initial' | 'submitting'>('initial');

  const onSubmit = async (formData: IFormData) => {
    setStatus('submitting');
    await handleRegistration(formData, navigate, setToken);
    setStatus('initial');
  };

  if (!isAnonymous) {
    return <Navigate to="/" replace />;
  }

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
