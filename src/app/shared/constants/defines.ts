import { environment } from '../../../environments/environment';

export const API_URL = {
  // login: environment.api + 'user/login'
  login: environment.apiUrl + 'v1/apixoauth2password/oauth2/token'
};

export const DEFAULT_ERROR_MESSAGE = {
  text: 'DEFAULT ERROR MESSAGE.',
};

export const MODULE_NAME = {
  Authorization: 'Authorization',
  Common: 'Common',
  accountManagement: 'account-management'
};


export const SESSION_STORAGE_PREFIX = '';