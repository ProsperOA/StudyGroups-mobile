import { NavigationActions, NavigationParams, StackActions } from 'react-navigation';

let _navigator: any;

const setTopLevelNavigator = (navigatorRef: any): void => {
  _navigator = navigatorRef;
};

const navigate = (routeName: string, params?: NavigationParams, reset?: boolean): void => {
  if (reset) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName, params })]
    });

    _navigator.dispatch(resetAction);
  }
  else {
    _navigator.dispatch(
      NavigationActions.navigate({ routeName, params })
    );
  }
};

export default {
  navigate,
  setTopLevelNavigator,
};