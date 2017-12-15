export const BACKEND_API = 'Backend API (API)';
export const MANAGE_USER_FOR_DOMAIN_NAME = 'manageUserForDomainName';
export const CLIENT_TYPES = [
  'Browser based apps (SPA)',
  'Backend API (API)',
  'Webapps (Webapps)',
];
export const IGNORED_CLIENTS = [
  'account',
  'admin-cli',
  'broker',
  'realm-management',
  'security-admin-console',
  'master-realm',
];
export const CURRENT_DOMAIN_NAME = 'currentdomainName';
export const IGNORED_ROLES = [
  'offline_access',
  'uma_authorization',
  'create-realm',
  'admin',
];
export const DELETE_ROLE_MESSAGE = 'Do you want to remove this role?';

export const DELETION_WARNING_MESSAGE = `Are you sure you want to get rid of this domain ?
                                         Once deleted, your domain will be gone forever.`;

export const DELETE_CLIENT_MESSAGE = 'Do you want to remove this Client?';

export const DELETE_USER_MESSAGE = 'Are you sure you want to remove this user?';
