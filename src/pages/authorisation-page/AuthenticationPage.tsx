import type { JSX } from 'react';
import DynamicForm from '../../components/forms/DynamicForm';
import { authenticationFields } from '../../components/forms/registration/fieldsConfig';
import type { IFormDataAuth } from '../../types/interfaces';
import { fetchToken } from '../../utils/token/tokenType';
import { showNotification } from '../../utils/toastify/showNotification';
import type { IRegistrationError } from '../../types/interfaces';
import { useAuth } from '../../api/authorithation/AuthToken';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function AuthenticationPage(): JSX.Element {
  const { isAnonymous, setToken } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (data: IFormDataAuth) => {
    console.log('Login:', data);
    // logic
    try {
      const { token, scope } = await fetchToken('customer', {
        email: data.email,
        password: data.password,
      });
      setToken(token, scope);
      showNotification({
        text: 'Authentication successful!',
        type: 'success',
      });
      console.log('Token and scope received (not stored):', token, scope);
      // navigate('/');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorType = error as IRegistrationError;
        showNotification({
          text: errorType.message || 'Network error. Please try again later.',
          type: 'error',
        });
      }
    }
  };

  useEffect(() => {
    if (!isAnonymous) {
      navigate('/');
    }
  }, [isAnonymous, navigate]);

  return (
    <div className="registration-page registration-page--auth">
      <div className="registration-page__image">
        <img src="/img/registration/register_page.jpeg" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
        <div className="registration-page__link-to-auth">
          <p>New here? Create an account!</p>
          <Link to="/registration" className="button button--login">
            Registration
          </Link>
        </div>

        <DynamicForm<IFormDataAuth>
          fields={authenticationFields}
          onSubmit={handleLogin}
          title="Login"
          submitText="Auth"
          showAddress={false}
        />
      </div>
    </div>
  );
}

export default AuthenticationPage;
