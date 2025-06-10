import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../components/user-profile/hooks/useUserProfile';
import { useAuth } from '../../api/authorithation/AuthToken';
import { usePasswordChange } from '../../components/user-profile/hooks/usePasswordChange';
import { usePersonalInfo } from '../../components/user-profile/hooks/usePersonalInfo';
import { useAddressManagement } from '../../components/user-profile/hooks/useAddressManagement';

import { personalFields } from '../../components/user-profile/forms/personalFields';
import { addressFields } from '../../components/user-profile/forms/addressFields';
import { passwordFields } from '../../components/user-profile/forms/passwordFields';

import EditableCard from '../../components/ui/editable-card/EditableCard';
import EditForm from '../../components/ui/form/EditForm';
import Modal from '../../components/ui/modal/editModal/Modal';
import BaseButton from '../../components/ui/base-button/BaseButton';
import PersonalInfo from '../../components/user-profile/PersonalInfo';
import UserAddresses from '../../components/user-profile/UserAddresses';

import type {
  IUserProfileFormFields,
  IPasswordFormFields,
} from '../../components/user-profile/forms/userProfileFormTypes';

import type { IAddressFormFields } from '../../types/interfaces';

import './userLoginProfile.scss';
import {
  areAddressesEqual,
  getAddressTitle,
} from '../../components/user-profile/utils/addressUtils';

function UserLoginProfile() {
  const { user, setUser } = useUserProfile();
  const { token, isAnonymous } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAnonymous) {
      navigate('/profile-access-block');
    } else if (token) {
      navigate('/profile-info');
    }
  }, [isAnonymous, token, navigate]);

  const password = usePasswordChange(user, setUser);
  const personal = usePersonalInfo(user, setUser);
  const address = useAddressManagement(user, setUser, token);

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
          <BaseButton
            type="button"
            title="Add Address"
            className="button button--add-address"
            onClick={address.prepareAddAddress}
          >
            Add Address
          </BaseButton>

          <EditableCard title="Personal Info" onEdit={personal.openPersonalModal}>
            <PersonalInfo user={user} />
          </EditableCard>

          {user.addresses.map((addr, _, array) => {
            const duplicates = array.filter((a) => areAddressesEqual(a, addr));
            const index = duplicates.findIndex((a) => a.id === addr.id);
            const title = getAddressTitle(addr, user, duplicates, index);

            return (
              <EditableCard
                key={addr.id}
                title={title}
                onEdit={() => address.openEditAddressModal(addr)}
                onDelete={() => address.handleDeleteAddress(addr.id)}
              >
                <UserAddresses
                  user={user}
                  addresses={[addr]}
                  onSetDefault={address.setDefaultAddress}
                />
              </EditableCard>
            );
          })}

          <EditableCard title="Change Password" onEdit={password.openPasswordModal}>
            <p>You can change your password here.</p>
          </EditableCard>

          <Modal
            title="Edit Personal Info"
            isOpen={personal.isPersonalModalOpen}
            onSave={personal.savePersonal}
            onClose={personal.cancelPersonal}
          >
            <EditForm<IUserProfileFormFields>
              ref={personal.personalFormRef}
              fields={personalFields}
              initialValues={personal.personalFormValues}
              onChange={personal.setPersonalFormValues}
            />
          </Modal>

          <Modal
            title="Edit Address"
            isOpen={address.isAddressModalOpen}
            onSave={address.saveAddress}
            onClose={address.cancelAddress}
          >
            <EditForm<IAddressFormFields>
              ref={address.addressFormRef}
              fields={addressFields}
              initialValues={address.addressFormValues}
              onChange={address.setAddressFormValues}
            />
          </Modal>

          <Modal
            title="Change Password"
            isOpen={password.isPasswordModalOpen}
            onSave={password.savePassword}
            onClose={password.cancelPassword}
          >
            <EditForm<IPasswordFormFields>
              ref={password.passwordFormRef}
              fields={passwordFields}
              initialValues={password.passwordFormValues}
              onChange={password.setPasswordFormValues}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default UserLoginProfile;
