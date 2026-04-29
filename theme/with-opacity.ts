import {Platform} from 'react-native';

export function withOpacity(variableName: string) {
  return ({opacityValue}: {opacityValue?: number}) => {
    if (opacityValue !== undefined) {
      return Platform.select({
        ios: `rgb(var(--${variableName}) / ${opacityValue})`,
        default: `rgb(var(--android-${variableName}) / ${opacityValue})`,
      });
    }
    return Platform.select({
      ios: `rgb(var(--${variableName}))`,
      default: `rgb(var(--android-${variableName}))`,
    });
  };
}
