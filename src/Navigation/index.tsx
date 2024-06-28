// Navigation.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../Screens/Splash';
import LoginScreen from '../Screens/Login';
import TodoList from '../Screens/TodoList';
import OTPScreen from '../Screens/OTP';
import Profile from '../Screens/Profile';
import GlobalImages from '../Assets/GlobalImages';
import { Image } from 'react-native';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    OTP: { verificationId: string };
    CustomTab: undefined;
    TodoList: undefined;
    Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconImage;

                    if (route.name === 'TodoList') { iconImage = GlobalImages.TodoList } else if (route.name === 'Profile') {
                        iconImage = GlobalImages.Profile;
                    }

                    return <Image source={iconImage} style={{ width: 24, height: 24, tintColor: color }} />;
                },
            })}
        // tabBarOptions={{
        //     activeTintColor: 'tomato', // Color for the active tab
        //     inactiveTintColor: 'gray', // Color for inactive tabs
        // }}
        >
            <Tab.Screen name="TodoList" component={TodoList} options={{ title: 'Todo List', headerShown: false, }} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerShown: false }} />
        </Tab.Navigator>
    );
};

const Navigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{
                ...TransitionPresets.SlideFromRightIOS, // Apply slide transition
            }}>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                {/* <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: false }} /> */}
                <Stack.Screen name="CustomTab" component={TabNavigator} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
