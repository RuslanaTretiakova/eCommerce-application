import type { JSX } from 'react';
import DynamicForm from '../../components/forms/DynamicForm';
import { authenticationFields } from '../../components/forms/registration/fieldsConfig';
import type { IFormDataAuth } from '../../types/interfaces';

function AuthenticationPage(): JSX.Element {
  const handleLogin = (data: IFormDataAuth) => {
    console.log('Login:', data);
    // logic
  };
  return (
    <div className="registration-page">
      <div className="registration-page__image">
        <img src="./src/assets/images/register_page.jpeg.png" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
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
