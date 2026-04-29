import React from 'react';
import {
  Pressable,
  Modal as RNModal,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Text from 'components/core/Text';
import {useColors} from 'providers/Theme';
import {IconCloseCircle} from 'assets/svgs/close-circle';

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  visible?: boolean;
  bodyStyle?: StyleProp<ViewStyle>;
  animationType?: 'none' | 'slide' | 'fade';
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  onClose,
  visible,
  bodyStyle,
  animationType = 'fade',
}) => {
  const colors = useColors();
  return (
    <RNModal
      visible={!!visible}
      transparent
      animationType={animationType}
      collapsable
      onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          className="w-[90%] max-h-[80%] rounded-[20px]"
          style={{backgroundColor: colors.background}}>
          <View className="flex-row items-center justify-between pt-5 px-5 mb-5">
            <Text fs={18} fw={600} color={colors.primary}>
              {title}
            </Text>
            <Pressable onPress={onClose}>
              <SvgXml xml={IconCloseCircle} fill={colors.primary} />
            </Pressable>
          </View>
          <View className="pb-5" style={bodyStyle}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
