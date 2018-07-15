import * as React from 'react';
import { Icon }   from 'native-base';

interface TabIconProps {
  type:  any;
  name:  string;
  size:  number;
  color: {
    focused: boolean;
    tintColor: string;
  };
}

export const TabIcon = (props: TabIconProps): JSX.Element => (
  <Icon
    type={props.type}
    name={props.name}
    style={{color: props.color.tintColor, fontSize: props.size}} />
);