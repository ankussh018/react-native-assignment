import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'USER_KEY';

export const UserSignedIn = async () => {
    // Implement Google Sign-In logic here
    // After successful sign-in:
    await AsyncStorage.setItem(USER_KEY, 'true');
};

export const signOut = async () => {
    try {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        throw error;
    }
};

export const isLoggedIn = async () => {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user !== null;
};
