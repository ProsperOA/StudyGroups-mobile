import { AsyncStorage } from 'react-native';

const AUTH_TOKEN_NAME = 'studygroups_auth_token';

export const storeAuthToken = async (userID: string, token: string): Promise<any> => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_NAME, `${userID}-${token}`);
  }
  catch (error) {
    console.warn(error);
  }
};

export const getAuthToken = (callback: (token?: string) => void) => {
  AsyncStorage.getItem(AUTH_TOKEN_NAME, (err, authToken) => {
    callback(authToken || '');
  });
};

export const removeAuthToken = (): void => {
  AsyncStorage.removeItem(AUTH_TOKEN_NAME, err => {
    if (err) console.error(err);
  });
}