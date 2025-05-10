import anonymousAuthMiddlewareOptions from '../flow/anonym-flow';

export function createAnonymUser() {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';
  console.log(projectKey);
  anonymousAuthMiddlewareOptions().withProjectKey({ projectKey }).get().execute();
}
