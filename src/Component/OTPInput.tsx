import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface OTPInputProps extends TextInputProps {
    length: number;
    onOtpChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onOtpChange, ...props }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) {
            // Only take the last digit if more than one is entered
            text = text.slice(-1);
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        onOtpChange(newOtp.join(''));

        if (text && index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
            inputs.current[index - 1].focus();
        }
    };

    const handleFocus = (index: number) => {
        if (index > 0 && !otp[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array(length)
                .fill('')
                .map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref as TextInput)}
                        style={styles.input}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={otp[index]}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onFocus={() => handleFocus(index)}
                        {...props}
                    />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default OTPInput;
