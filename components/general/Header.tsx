import {images} from 'assets';
import {useMemo} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {stylesGlobal} from 'styles/global';
import {useLanguage} from 'providers/Language';
import {useNavigation} from '@react-navigation/native';
import {TUseNavigation} from 'types/react-navigation';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {TLanguageKey} from 'languages';
import {useColors} from 'providers/Theme';
import Button from 'components/Button';
import Text from 'components/Text';

export const HEIGHT = 65;

type Props<T> = {
  headerBackStyle?: StyleProp<ViewStyle>;
} & T;

const Header = (props: Partial<Props<NativeStackHeaderProps>>) => {
  const {options, headerBackStyle} = props;
  const {top} = useSafeAreaInsets();
  const {translate} = useLanguage();
  const colors = useColors();
  const navigation = useNavigation<TUseNavigation>();
  const canGoBack = navigation.canGoBack();
  const tintColor = useMemo(
    () => options?.headerTintColor ?? colors.primary,
    [colors.primary, options?.headerTintColor],
  );

  const buttonRight = useMemo(() => {
    if (options?.headerRight) return options.headerRight({canGoBack});
    if (!canGoBack || !(options?.headerBackVisible ?? true)) return null;
    return (
      <Button
        style={[styles.btnBack, headerBackStyle, {borderColor: tintColor}]}
        outline
        onPress={navigation.goBack}
        text={options?.headerBackTitle ?? translate('back')}
        textStyle={[{color: tintColor}, options?.headerBackTitleStyle]}
        height={36}
      />
    );
  }, [
    canGoBack,
    headerBackStyle,
    navigation.goBack,
    options,
    tintColor,
    translate,
  ]);

  if (!(options?.headerShown ?? true)) return null;

  return (
    <View style={[{backgroundColor: colors.background}, options?.headerStyle]}>
      <View style={[stylesGlobal.pageHorizontal, {paddingTop: top}]}>
        <View style={[styles.root, {height: HEIGHT}]}>
          {options?.headerLeft?.({
            tintColor: options.headerTintColor,
            canGoBack,
          }) ?? (
            <View style={styles.logoRelative}>
              <Image style={styles.logo} source={images.LogoIcon} />
            </View>
          )}
          {buttonRight}
        </View>
        {options?.title ? (
          <Text
            color={options.headerTintColor || colors.primary}
            fw={600}
            style={[styles.title, options.headerTitleStyle]}>
            {translate(options.title as TLanguageKey, undefined, options.title)}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    width: '100%',
  },
  logo: {width: 44, height: 44},
  title: {fontSize: 24},
  logoRelative: {position: 'relative'},
  btnBack: {
    width: 'auto',
    paddingHorizontal: 16,
    minWidth: 90,
  },
});

export default Header;
