import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';

const USER_KEY = 'USER_KEY';
type Props = {
    navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
};

export const UserSignedIn = async () => {
    await AsyncStorage.setItem(USER_KEY, 'true');
};

export const signOut = async ({ navigation }: Props) => {
    try {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_KEY);
        navigation.navigate('Login');
    } catch (error) {
        throw error;
    }
};

export const isLoggedIn = async () => {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user !== null;
};
