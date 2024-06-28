// screens/SplashScreen.tsx
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../Navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TodoItem, addTodoItem, getTodoItems } from '../../helper';
import { signOut } from '../Utils/auth';
import { useNavigation } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'TodoList'>;

const TodoList: React.FC<Props> = ({ navigation }) => {
    // const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [newTodoItem, setNewTodoItem] = React.useState('');
    useEffect(() => {
        getTodoItems(0, 10).then(items => setTodoItems(items));
    }, [newTodoItem]);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>TODO</Text>
                </View>
                <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
                    {todoItems.map((item: any) => (
                        <View key={item.id} style={styles.todoItem}>
                            <Text style={styles.sectionDescription}>{item.title}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.sectionContainer}>
                    <TextInput
                        style={styles.sectionDescription}
                        placeholder="Add your todo item"
                        onChange={e => setNewTodoItem(e.nativeEvent.text)}
                    />
                    <Button
                        title="Add"
                        onPress={() => {
                            addTodoItem(newTodoItem).then(() => {
                                getTodoItems(0, 10).then(items => {
                                    setTodoItems(items);
                                });
                            });
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    todoItem: {
        fontSize: 18,
        fontWeight: '400',
        borderBottomWidth: 1,
        padding: 8,
        borderBottomColor: 'gray',
    },
});

export default TodoList;
