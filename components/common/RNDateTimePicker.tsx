import React, {
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {DimensionValue, TextInputProps, View} from 'react-native';
import {useColors} from 'providers/Theme';
import Input from 'components/Input';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeValue?: (date: string) => void;
  width?: DimensionValue;
  error?: string;
  disabled?: boolean;
} & Omit<TextInputProps, 'onChange' | 'onChangeText'>;

const RNDateTimePicker = ({
  value,
  onChangeValue,
  disabled,
  placeholder,
  error,
  width,
}: PropsWithChildren<Props>) => {
  const colors = useColors();

  const formattedDate = useMemo(() => {
    if (!value) return '';
    if (value.includes('/')) return value;
    const isIsoLike = /^\d{4}-\d{2}-\d{2}/.test(value);
    const isTimestamp = /^\d{10,13}$/.test(value);
    if (!isIsoLike && !isTimestamp) return value;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }, [value]);

  const formatInputValue = useCallback((text: string) => {
    const digitsOnly = text.replace(/\D/g, '').slice(0, 8);
    const mm = digitsOnly.slice(0, 2);
    const dd = digitsOnly.slice(2, 4);
    const yyyy = digitsOnly.slice(4, 8);
    const withMonth = mm;
    const withDay = dd ? `${withMonth}/${dd}` : withMonth;
    return yyyy ? `${withDay}/${yyyy}` : withDay;
  }, []);

  const [inputValue, setInputValue] = React.useState(formattedDate);

  useEffect(() => {
    setInputValue(formattedDate);
  }, [formattedDate]);

  const handleChangeText = useCallback(
    (text: string) => {
      setInputValue(text);
      onChangeValue?.(text);
    },
    [onChangeValue],
  );

  const handleBlur = useCallback(() => {
    setInputValue(prev => {
      const formatted = formatInputValue(prev);
      onChangeValue?.(formatted);
      return formatted;
    });
  }, [formatInputValue, onChangeValue]);

  return (
    <View className="relative w-full" style={{width: width ?? '100%'}}>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChangeText={handleChangeText}
        editable={!disabled}
        maxLength={10}
        error={error}
        style={INPUT_STYLE}
        placeholderTextColor={colors.input.placeholder}
        onBlur={handleBlur}
      />
    </View>
  );
};

const INPUT_STYLE = {
  overflow: 'hidden' as const,
  borderWidth: 1,
  height: 56,
  borderRadius: 10,
  width: '100%' as const,
  fontSize: 16,
  paddingHorizontal: 16,
  justifyContent: 'flex-start' as const,
};

export default memo(RNDateTimePicker);
