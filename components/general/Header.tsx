import {images} from 'assets';
import {useMemo} from 'react';
import {Image, StyleProp, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLanguage} from 'providers/Language';
import {useNavigation} from '@react-navigation/native';
import {TUseNavigation} from 'types/react-navigation';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {TLanguageKey} from 'languages';
import {Button} from 'components/nativewindui/Button';
import {Text} from 'components/nativewindui/Text';

export const HEIGHT = 65;

type Props<T> = {
  headerBackStyle?: StyleProp<ViewStyle>;
} & T;

const Header = (props: Partial<Props<NativeStackHeaderProps>>) => {
  const {options, headerBackStyle} = props;
  const {top} = useSafeAreaInsets();
  const {translate} = useLanguage();
  const navigation = useNavigation<TUseNavigation>();
  const canGoBack = navigation.canGoBack();

  const buttonRight = useMemo(() => {
    if (options?.headerRight) return options.headerRight({canGoBack});
    if (!canGoBack || !(options?.headerBackVisible ?? true)) return null;
    return (
      <Button
        variant="secondary"
        size="sm"
        onPress={navigation.goBack}
        style={headerBackStyle as ViewStyle}>
        <Text>{options?.headerBackTitle ?? translate('back')}</Text>
      </Button>
    );
  }, [
    canGoBack,
    headerBackStyle,
    navigation.goBack,
    options,
    translate,
  ]);

  if (!(options?.headerShown ?? true)) return null;

  return (
    <View className="bg-background" style={options?.headerStyle}>
      <View className="px-6" style={{paddingTop: top}}>
        <View
          className="w-full flex-row items-center justify-between pb-5"
          style={{height: HEIGHT}}>
          {options?.headerLeft?.({
            tintColor: options.headerTintColor,
            canGoBack,
          }) ?? (
            <View className="relative">
              <Image style={{width: 44, height: 44}} source={images.LogoIcon} />
            </View>
          )}
          {buttonRight}
        </View>
        {options?.title ? (
          <Text variant="title2" className="text-primary">
            {translate(options.title as TLanguageKey, undefined, options.title)}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
