import { environment } from '../../../environments/environment';

export const API_URL = {
  // login: environment.api + 'user/login'
  login: environment.apiUrl + 'v1/apixoauth2password/oauth2/token',
  userProflie: environment.api + '/api/de-app/userProfile'
};

export const DEFAULT_ERROR_MESSAGE = {
  text: 'DEFAULT ERROR MESSAGE.',
};
export const STROGE_TYPE = {
  sessionStorage: 'sessionStorage',
  localStrorage: 'localStorage'
}

export const MODULE_NAME = {
  Authorization: 'Authorization',
  Common: 'Common',
  accountManagement: 'account-management'
};


export const STORAGE_PREFIX = 'app';
