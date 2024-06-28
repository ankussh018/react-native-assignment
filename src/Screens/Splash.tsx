// screens/SplashScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, LogBox } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';
import { isLoggedIn } from '../Utils/auth';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning....']);

type Props = StackScreenProps<RootStackParamList, 'Splash'>;
const Splash: React.FC<Props> = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [opacity, setOpacity] = useState(new Animated.Value(0));


  useEffect(() => {
    setTimeout(async () => {
      setIsLoading(false);
      const value = await isLoggedIn();
      console.log(value)
      if (value) {
        navigation.replace('CustomTab')
      } else {
        navigation.replace('Login')
      }
    }, 3500);

  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (isLoading) {
    return (
      <View style={{
        flex: 1, justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#000000'
      }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'black'} />
        <Animated.Text style={{ fontSize: 20, opacity, color: 'white', fontWeight: 'bold' }}>
          {'Todo List'}
        </Animated.Text>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Splash;
