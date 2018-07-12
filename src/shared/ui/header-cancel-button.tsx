import * as React from 'react';
import { Button, Text } from 'native-base';

interface HeaderCancelButtonProps {
  cancel: any;
}

export const HeaderCancelButton = ({ cancel }: HeaderCancelButtonProps): JSX.Element => (
  <Button onPress={cancel} transparent>
    <Text style={{color: '#fff', fontFamily: 'rubik-medium' }}>
      cancel
    </Text>
  </Button>
);