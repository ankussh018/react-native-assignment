import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { RootStackParamList } from '../Navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../Constants/colors';
import Button from '../Component/Button';

GoogleSignin.configure({
  webClientId: '1051718902034-sgda7kqk02fhat8s50k6b8i28m82nr2j.apps.googleusercontent.com', // From Firebase Console
});

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const onGoogleButtonPress = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const signedInUser = await auth().signInWithCredential(googleCredential);
      if (signedInUser) {
        navigation.replace('TodoList')
      } else { } 
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signInWithPhoneNumber = async (): Promise<void> => {
    const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
    console.log(JSON.stringify(confirmation));
    if (confirmation) {
      navigation.push('OTP', { verificationId: confirmation.verificationId || '' })
    } else { }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black
          }}>
            Hi Welcome Back ! 👋
          </Text>

          <Text style={{
            fontSize: 16,
            color: COLORS.black
          }}>Hello again you have been missed!</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "400",
            marginVertical: 8,
            color: COLORS.black
          }}>Phone</Text>

          <View style={{
            flexDirection: 'row',
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22
          }}>
            <Text style={{ fontSize: 14, color: COLORS.black }}>+91</Text>
            <TextInput
              placeholder='Enter your phone number'
              placeholderTextColor={COLORS.black}
              keyboardType='decimal-pad'
              style={{
                width: "100%"
              }}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>

        </View>

        <Button
          title="Get OTP"
          filled
          style={{
            marginTop: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => signInWithPhoneNumber()}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14, color: COLORS.black }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,

            }}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            onPress={() => onGoogleButtonPress()}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              backgroundColor: COLORS.GoogleBtnColor,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Sign In Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;