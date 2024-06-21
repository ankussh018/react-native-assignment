import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { RootStackParamList } from '../Navigation';
import { StackScreenProps } from '@react-navigation/stack';

GoogleSignin.configure({
  webClientId: '1051718902034-sgda7kqk02fhat8s50k6b8i28m82nr2j.apps.googleusercontent.com', // From Firebase Console
});

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirm, setConfirm] = useState<auth.ConfirmationResult | null>(null);
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
    setConfirm(confirmation);
  };

  const confirmCode = async (): Promise<void> => {
    if (confirm) {
      try {
        const user = await confirm.confirm(code);
        console.log('User: ', JSON.stringify(user));
        if (user) {
          navigation.replace('TodoList')
        } else { }
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  };

  return (
    <View>
      <GoogleSigninButton onPress={onGoogleButtonPress} />
      <TextInput placeholder="Phone Number" onChangeText={setPhoneNumber} />
      <Button title="Sign in with phone" onPress={signInWithPhoneNumber} />
      {confirm && (
        <React.Fragment>
          <TextInput placeholder="Verification Code" onChangeText={setCode} />
          <Button title="Confirm Code" onPress={confirmCode} />
        </React.Fragment>
      )}
    </View>
  );
};

export default LoginScreen;