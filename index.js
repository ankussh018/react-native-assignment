/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebaseConfig from './src/Utils/firebaseConfig';

AppRegistry.registerComponent(appName, () => App);
