import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Card,
  CardItem,
  Button,
  Text
} from 'native-base';
import { DARK_GRAY } from '../styles';

export interface DropdownMenuItem {
  value: string | JSX.Element;
  icon?: JSX.Element;
  onPress?: (...args: any[]) => any;
}

interface DropwdownMenuProps {
  items: DropdownMenuItem[];
  open: boolean;
  viewAnimation?: string;
  cardAnimation?: string;

}

export class DropdownMenu extends React.Component<DropwdownMenuProps, any> {
  public state = {
    window: Dimensions.get("window")
  };

  public componentWillMount(): void {
    Dimensions.addEventListener("change", this.dimensionsChangeHandler);
  }

  public componentWillUnmount(): void {
    Dimensions.removeEventListener("change", this.dimensionsChangeHandler);
  }

  public dimensionsChangeHandler = ({ window }: any) => this.setState({ window });

  public render(): any {
    if (!this.props.open) return null;

    const { height, width } = this.state.window;

    return (
      <Animatable.View
        animation={this.props.viewAnimation}
        duration={250}
        style={[{ marginTop: height > width ? 88 : 64 }, styles.mainView]}>
        <Animatable.View
          animation={this.props.cardAnimation}
          duration={300}>
          <View style={{ flex: 0.55, flexDirection: 'column' }}>
            <View style={{flex: 0.8}}>
              <Card style={styles.card}>
                {this.props.items.map((item, index) => (
                  <CardItem
                    key={index}
                    style={styles.cardItem}>
                    <Button onPress={item.onPress && item.onPress} transparent>

                      {item.icon}
                      {typeof item.value === 'string'
                        ? <Text style={styles.btnText}>
                            {item.value}
                          </Text>
                        : item.value}
                    </Button>
                  </CardItem>
                ))}
              </Card>
            </View>
          </View>
        </Animatable.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  card: {
    borderRadius: 14,
    marginLeft: 5
  },
  cardItem: {
    borderRadius: 14,
    height: 50
  },
  btnText: {
    color: DARK_GRAY,
    fontFamily: 'rubik-medium',
    fontSize: 22,
    paddingLeft: 0
  }
});