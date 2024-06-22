/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import Navigation from './src/Navigation';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning....']);

function App(): JSX.Element {
  return (
    <Navigation />
  );
}

export default App;
