import { Toast } from 'native-base';

export const defaultToastConfig: any = {
  textStyle: {
    color:      '#fff',
    fontWeight: 'bold',
    fontFamily: 'rubik-medium',
    textAlign:  'center'
  },
  position: 'bottom',
};

export const toast = (config: any): void => Toast.show(config);