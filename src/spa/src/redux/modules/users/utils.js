import { getUserSlug } from '../../../utils';

function isForLoggedUser(userSlug) {
  return !userSlug || userSlug === getUserSlug();
}

export { isForLoggedUser };
