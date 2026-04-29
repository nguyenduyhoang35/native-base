import {useColors} from 'providers/Theme';
import {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';
import {stylesGlobal} from 'styles/global';

const Layout = ({children, style, ...p}: PropsWithChildren<ViewProps>) => {
  const colors = useColors();

  return (
    <View
      style={[stylesGlobal.flex1, {backgroundColor: colors.background}, style]}
      {...p}>
      {children}
    </View>
  );
};

export default Layout;
