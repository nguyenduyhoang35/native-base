import {VariantProps, cva} from 'class-variance-authority';
import * as React from 'react';
import {TextProps as RNTextProps} from 'react-native';
import {UITextView} from 'react-native-uitextview';
import {cssInterop} from 'nativewind';
import {cn} from 'lib/cn';

type UITextViewProps = RNTextProps & {uiTextView?: boolean};

cssInterop(UITextView, {className: 'style'});

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      largeTitle: 'text-4xl',
      title1: 'text-3xl',
      title2: 'text-[22px] leading-7',
      title3: 'text-xl',
      heading: 'text-[17px] leading-6 font-semibold',
      body: 'text-[17px] leading-6',
      callout: 'text-base',
      subhead: 'text-[15px] leading-6',
      footnote: 'text-[13px] leading-5',
      caption1: 'text-xs',
      caption2: 'text-[11px] leading-4',
    },
    color: {
      primary: '',
      secondary: 'text-secondary-foreground/90',
      tertiary: 'text-muted-foreground/90',
      quarternary: 'text-muted-foreground/50',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = UITextViewProps & VariantProps<typeof textVariants>;

function Text({className, variant, color, ...props}: TextProps) {
  const textClassName = React.useContext(TextClassContext);
  return (
    <UITextView
      className={cn(textVariants({variant, color}), textClassName, className)}
      {...props}
    />
  );
}

export {Text, TextClassContext, textVariants};
