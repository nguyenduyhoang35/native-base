import {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';

const Layout = ({children, style, ...p}: PropsWithChildren<ViewProps>) => {
  return (
    <View className="flex-1 bg-background" style={style} {...p}>
      {children}
    </View>
  );
};

export default Layout;
