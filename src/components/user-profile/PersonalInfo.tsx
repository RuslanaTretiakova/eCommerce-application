import type { IUserProfile } from '../../types/interfaces';

function PersonalInfo({ user }: { user: IUserProfile }) {
  return (
    <>
      <p>
        <span className="label">First Name:</span>
        {user.firstName}
      </p>
      <p>
        <span className="label">Last Name:</span>
        {user.lastName}
      </p>
      <p>
        <span className="label">Date of Birth:</span>
        {user.dateOfBirth}
      </p>
    </>
  );
}

export default PersonalInfo;
