import * as React from 'react';
import { Button, Text } from 'native-base';

import globalStyles from '../styles';

interface HeaderCancelButtonProps {
  cancel: any;
}

export const HeaderCancelButton = ({ cancel }: HeaderCancelButtonProps): JSX.Element => (
  <Button onPress={cancel} transparent>
    <Text style={[{ fontFamily: 'rubik-medium' }, globalStyles.primary]}>
      cancel
    </Text>
  </Button>
);