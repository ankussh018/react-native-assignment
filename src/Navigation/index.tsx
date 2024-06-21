// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screens/Splash';
import LoginScreen from '../Screens/Login';
import TodoList from '../Screens/TodoList';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    TodoList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="TodoList" component={TodoList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
