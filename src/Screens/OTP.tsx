import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';
import Button from '../Component/Button';
import OTPInput from '../Component/OTPInput';
import COLORS from '../Constants/colors';
import { UserSignedIn } from '../Utils/auth';

type Props = StackScreenProps<RootStackParamList, 'OTP'>;

const OTPScreen: React.FC<Props> = ({ navigation, route }) => {
    const [otp, setOtp] = useState('');
    const { verificationId } = route.params;

    const verifyOtp = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
            await auth().signInWithCredential(credential);
            Alert.alert('Verification successful');
            await UserSignedIn();
            // Navigate to the next screen or main app screen after successful verification
            navigation.navigate('TodoList');
        } catch (error: any) {
            Alert.alert('Verification failed', error.message);
        }
    };

    // const confirmCode = async (): Promise<void> => {
    //     if (confirm) {
    //       try {
    //         const user = await confirm.confirm(code);
    //         console.log('User: ', JSON.stringify(user));
    //         if (user) {
    //           // navigation.push('OTP', { verificationId: confirm })
    //         } else { }
    //       } catch (error) {
    //         console.log('Invalid code.');
    //       }
    //     }
    //   };

    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 22 }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginVertical: 12,
                    color: COLORS.black
                }}>
                    Enter OTP !
                </Text>

                <Text style={{
                    fontSize: 16,
                    color: COLORS.black
                }}>Please enter OTP to get in!</Text>
            </View>

            <OTPInput length={6} onOtpChange={setOtp} />

            <Button
                title="Verify"
                filled
                style={{
                    marginTop: 18,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => verifyOtp()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default OTPScreen;
