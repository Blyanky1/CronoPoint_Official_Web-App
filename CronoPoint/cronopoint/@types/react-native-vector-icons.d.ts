declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Icon } from 'react-native-vector-icons/Icon';
  import { Component } from 'react';
  import { TextStyle, StyleProp } from 'react-native';

  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
  }

  export default class MaterialCommunityIcons extends Component<IconProps> {}
}
