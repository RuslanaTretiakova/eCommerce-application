import { createAnonymUser } from './create-anonym-user';

if (!localStorage.getItem('userId')) {
  createAnonymUser();
}
