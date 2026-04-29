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
import Text from 'components/Text';
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
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <View style={styles.header}>
            <Text fs={18} fw={600} color={colors.primary}>
              {title}
            </Text>
            <Pressable onPress={onClose}>
              <SvgXml xml={IconCloseCircle} fill={colors.primary} />
            </Pressable>
          </View>
          <View style={[styles.content, bodyStyle]}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  content: {
    paddingBottom: 20,
  },
});

export default Modal;
