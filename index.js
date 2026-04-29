/**
 * @format
 */

import './global.css';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import KeyboardManager from 'react-native-keyboard-manager';

if (Platform.OS === 'ios') KeyboardManager.setEnable(false);

AppRegistry.registerComponent(appName, () => App);
