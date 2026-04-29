import {useColors} from 'providers/Theme';
import {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';

const Layout = ({children, style, ...p}: PropsWithChildren<ViewProps>) => {
  const colors = useColors();

  return (
    <View
      className="flex-1"
      style={[{backgroundColor: colors.background}, style]}
      {...p}>
      {children}
    </View>
  );
};

export default Layout;
