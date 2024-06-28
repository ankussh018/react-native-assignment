import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GlobalImages from '../Assets/GlobalImages';

interface UserInfoProps {
    displayName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    uid: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ displayName, email, phoneNumber, uid }) => {
    return (
        <View style={styles.container}>
            {displayName && <Text style={styles.text}>Name: {displayName}</Text>}
            {email && <Text style={styles.text}>Email: {email}</Text>}
            {phoneNumber && <Text style={styles.text}>Phone: {phoneNumber}</Text>}
            <Text style={styles.text}>UID: {uid}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 15,
        marginHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default UserInfo;
