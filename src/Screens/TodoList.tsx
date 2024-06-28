// // screens/SplashScreen.tsx
// import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import React, { useEffect, useState } from 'react';
// import { RootStackParamList } from '../Navigation';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { TodoItem, addTodoItem, getTodoItems } from '../../helper';
// import { signOut } from '../Utils/auth';
// import { useNavigation } from '@react-navigation/native';

// type Props = StackScreenProps<RootStackParamList, 'TodoList'>;

// const TodoList: React.FC<Props> = ({ navigation }) => {
//     // const navigation = useNavigation();
//     const isDarkMode = useColorScheme() === 'dark';
//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     };
//     const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
//     const [newTodoItem, setNewTodoItem] = React.useState('');
//     useEffect(() => {
//         getTodoItems(0, 10).then(items => setTodoItems(items));
//     }, [newTodoItem]);

//     return (
//         <SafeAreaView style={backgroundStyle}>
//             <StatusBar
//                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                 backgroundColor={backgroundStyle.backgroundColor}
//             />
//             <ScrollView
//                 contentInsetAdjustmentBehavior="automatic"
//                 style={backgroundStyle}>
//                 <View style={styles.sectionContainer}>
//                     <Text style={styles.sectionTitle}>TODO</Text>
//                 </View>
//                 <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
//                     {todoItems.map((item: any) => (
//                         <View key={item.id} style={styles.todoItem}>
//                             <Text style={styles.sectionDescription}>{item.title}</Text>
//                         </View>
//                     ))}
//                 </ScrollView>
//                 <View style={styles.sectionContainer}>
//                     <TextInput
//                         style={styles.sectionDescription}
//                         placeholder="Add your todo item"
//                         onChange={e => setNewTodoItem(e.nativeEvent.text)}
//                     />
//                     <Button
//                         title="Add"
//                         onPress={() => {
//                             addTodoItem(newTodoItem).then(() => {
//                                 getTodoItems(0, 10).then(items => {
//                                     setTodoItems(items);
//                                 });
//                             });
//                         }}
//                     />
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 24,
//     },
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: '400',
//     },
//     highlight: {
//         fontWeight: '700',
//     },
//     todoItem: {
//         fontSize: 18,
//         fontWeight: '400',
//         borderBottomWidth: 1,
//         padding: 8,
//         borderBottomColor: 'gray',
//     },
// });

// export default TodoList;






import React, { useEffect, useState } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    useColorScheme,
    ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TodoItem, addTodoItem, getTodoItems } from '../../helper';
import { signOut } from '../Utils/auth';

type Props = StackScreenProps<RootStackParamList, 'TodoList'>;

const TodoList: React.FC<Props> = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        flex:1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [newTodoItem, setNewTodoItem] = useState('');
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    useEffect(() => {
        loadTodoItems(0, 10);
    }, []);

    const loadTodoItems = (startIndex: number, count: number) => {
        getTodoItems(startIndex, count).then((items) => {
            setTodoItems((prevItems) => [...prevItems, ...items]);
            setIsLoadingMore(false);
        });
    };

    const handleAddTodoItem = () => {
        if (!newTodoItem.trim() || isAddingTodo) {
            return;
        }
        setIsAddingTodo(true);
        addTodoItem(newTodoItem).then(() => {
            setNewTodoItem('');
            setIsAddingTodo(false);
            // Ideally, you would append the new item directly without reloading all items
            // For demonstration, clearing and reloading all items again
            loadTodoItems(0, todoItems.length + 1); // Load more items to display the newly added item
        }).catch((error) => {
            console.error('Error adding todo item:', error);
            setIsAddingTodo(false);
        });
    };

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // Load more items if scrolled to the bottom
            setIsLoadingMore(true);
            loadTodoItems(todoItems.length, 10); // Adjust count based on your API or data handling
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>TODO</Text>
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
                onScroll={handleScroll}
                scrollEventThrottle={400}>
                {todoItems.map((item: TodoItem, index) => (
                    <View key={index} style={styles.todoItem}>
                        <Text style={styles.sectionDescription}>{item.title}</Text>
                    </View>
                ))}
                {isLoadingMore && <ActivityIndicator style={{ marginTop: 10 }} />}
            </ScrollView>
            <View style={styles.sectionContainer}>
                <TextInput
                    style={styles.sectionDescription}
                    placeholder="Add your todo item"
                    value={newTodoItem}
                    onChangeText={setNewTodoItem}
                    editable={!isAddingTodo}
                />
                <Button title="Add" onPress={handleAddTodoItem} disabled={isAddingTodo} />
            </View>
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
        marginBottom: 10
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

