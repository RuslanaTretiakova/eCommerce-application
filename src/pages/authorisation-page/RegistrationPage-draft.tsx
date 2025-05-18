import type { JSX } from 'react';
import DynamicForm from '../../components/forms/DynamicForm';
import { registrationFields } from '../../components/forms/registration/fieldsConfig';
import type { IFormData } from '../../types/interfaces';

function RegistratontionPageDraft(): JSX.Element {
  const handleRegistration = (data: IFormData) => {
    console.log('Login:', data);
    // logic
  };
  return (
    <div className="registration-page">
      <div className="registration-page__image">
        <img src="./src/assets/images/register_page.jpeg.png" alt="Register illustration" />
      </div>
      <div className="registration-page__form">
        <DynamicForm<IFormData>
          fields={registrationFields}
          onSubmit={handleRegistration}
          title="Registration"
          submitText="Submit"
        />
      </div>
    </div>
  );
}

export default RegistratontionPageDraft;
