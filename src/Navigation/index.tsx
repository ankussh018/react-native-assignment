// Navigation.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashScreen from '../Screens/Splash';
import LoginScreen from '../Screens/Login';
import TodoList from '../Screens/TodoList';
import OTPScreen from '../Screens/OTP';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    OTP: { verificationId: string };
    TodoList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()

const Navigation = () => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInStatus = await isLoggedIn();
                setLoggedIn(loggedInStatus);
            } catch (error) {
                console.error('Error checking login status:', error);
                // Handle error as per your app's requirement
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{
                ...TransitionPresets.SlideFromRightIOS, // Apply slide transition
            }}>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: false }} />
          
           </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
