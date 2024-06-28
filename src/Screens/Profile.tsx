import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import firebase from '../Utils/firebaseConfig';
import { RootStackParamList } from '../Navigation';
import { StackScreenProps } from '@react-navigation/stack';
import COLORS from '../Constants/colors';
import Button from '../Component/Button';
import { signOut } from '../Utils/auth';
import GlobalImages from '../Assets/GlobalImages';
import UserInfo from '../Component/UserInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
            if (user) {
                console.log(user);
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();

    }, []);
    if (!user) {
        return <View><Text style={{ color: 'black' }}>Loading...</Text></View>; // or redirect to login screen
    }
    const { displayName, email, phoneNumber, photoURL, uid } = user;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginVertical: 12,
                    color: COLORS.black,
                    textAlign: 'center'
                }}> Profile </Text>
                <View style={{ width: 100, height: 100, backgroundColor: 'red', alignSelf: 'center', borderRadius: 15, marginTop: 10, overflow: 'hidden' }}>
                    <Image
                        source={photoURL ? { uri: photoURL } : GlobalImages.ProfilePhoto}
                        style={{ width: '100%', height: '100%' }}
                        resizeMethod='auto'
                        resizeMode='cover'
                    />
                </View>
                <UserInfo
                    displayName={displayName}
                    email={email}
                    phoneNumber={phoneNumber}
                    uid={uid}
                />
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10 }}>
                    <Button
                        title="Sign Out"
                        onPress={() => signOut({ navigation })}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;