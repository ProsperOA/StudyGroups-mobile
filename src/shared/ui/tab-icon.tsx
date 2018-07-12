import * as React from 'react';
import { Icon }   from 'native-base';

interface TabIconProps {
  name:  string;
  color: {
    focused: boolean;
    tintColor: string;
  };
}

export const TabIcon = ({name, color: { tintColor }}: TabIconProps): JSX.Element => (
  <Icon
    type="FontAwesome"
    name={name}
    style={{color: tintColor}} />
);