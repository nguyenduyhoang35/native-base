import colors from 'constants/colors';
import {shallowEqual, useSelector} from 'react-redux';
import {modeSelector} from 'store/slices/user';
import {ModeType} from 'types/user';

export const useColors = () => {
  const {Dark, Light, ...c} = colors;
  const mode = useSelector(modeSelector, shallowEqual);
  return {...c, ...(mode === ModeType.DARK ? Dark : Light)};
};
