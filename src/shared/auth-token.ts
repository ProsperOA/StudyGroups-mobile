import { AsyncStorage } from 'react-native';

export const storeAuthToken = async (userID: string, token: string): Promise<any> => {
  try {
    await AsyncStorage.setItem('studygroups_auth_token', `${userID}-${token}`);
  }
  catch (error) {
    console.warn(error);
  }
};

  export const getAuthToken = (callback: (token?: string) => void) => {
    AsyncStorage.getItem('studygroups_auth_token', (err, authToken) => {
      callback(authToken || '');
    });
  };