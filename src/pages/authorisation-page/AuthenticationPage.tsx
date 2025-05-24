import type { JSX } from 'react';
import DynamicForm from '../../components/forms/DynamicForm';
import { authenticationFields } from '../../components/forms/registration/fieldsConfig';
import type { IFormDataAuth } from '../../types/interfaces';
import { getCustomerApi } from '../../api/sdkClient';
import { Link } from 'react-router-dom';

function AuthenticationPage(): JSX.Element {
  const handleLogin = async (data: IFormDataAuth) => {
    console.log('Login:', data);
    // logic
    try {
      const apiRoot = getCustomerApi(data.email, data.password);
      const response = await apiRoot.me().get().execute();
      console.log(response.body);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="registration-page registration-page--auth">
      <div className="registration-page__image">
        <img src="/img/registration/register_page.jpeg" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
        <div className='registration-page__link-to-auth'>
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
        />
      </div>
    </div>
  );
}

export default AuthenticationPage;
