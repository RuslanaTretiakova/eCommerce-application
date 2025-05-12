import BaseForm from '../../ui/base-form/BaseForm';
import type { JSX } from 'react';

function RegistrationForm(): JSX.Element {
  const handleRegistrationSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('hello');
  };

  return (
    <BaseForm className="form" onSubmit={handleRegistrationSubmit} title="Register">
      <button type="submit">Create Account</button>
    </BaseForm>
  );
}

export default RegistrationForm;
