import EditableCard from '../../components/ui/editable-card/EditableCard';
import { useUserProfile } from '../../components/user-profile/hooks/useUserProfile';
import UserAddresses from '../../components/user-profile/UserAddresses';
import PersonalInfo from '../../components/user-profile/PersonalInfo';

import './userLoginProfile.scss';

function UserLoginProfile() {
  const { user } = useUserProfile();

  return (
    <div className="user-login-profile">
      <div className="user-login-profile__header">
        {user && (
          <h2 className="user-login-profile__greeting">
            Welcome,
            {user.firstName}
          </h2>
        )}
      </div>

      {user && (
        <>
          <EditableCard title="Personal Info" onEdit={() => console.log('Edit personal info')}>
            <PersonalInfo user={user} />
          </EditableCard>

          <EditableCard title="Addresses" onEdit={() => console.log('Edit addresses')}>
            <UserAddresses addresses={user.addresses} />
          </EditableCard>
        </>
      )}
    </div>
  );
}

export default UserLoginProfile;
