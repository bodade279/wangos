import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC = () => {
    const route = useRoute<DetailScreenRouteProp>();
    const navigation = useNavigation();
    const { task, toggleTaskCompletion } = route.params;

    
    const [currentTask, setCurrentTask] = useState(task);

    const handleToggle = () => {
        const updatedTask = { ...currentTask, completed: !currentTask.completed };
        setCurrentTask(updatedTask);
        toggleTaskCompletion(currentTask.id);
    };

    useEffect(() => {
       
    }, [task]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.label}>Task ID:</Text>
                    <Text style={styles.value}>{currentTask.id}</Text>

                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.value}>{currentTask.userId}</Text>

                    <Text style={styles.label}>Title:</Text>
                    <Text style={styles.title}>{currentTask.title}</Text>

                    <Text style={styles.label}>Status:</Text>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: currentTask.completed ? '#E8F5E9' : '#FFEBEE' }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: currentTask.completed ? '#2E7D32' : '#C62828' }
                        ]}>
                            {currentTask.completed ? '✓ Completed' : '✗ Incomplete'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: currentTask.completed ? '#FF9800' : '#4CAF50' }
                    ]}
                    onPress={handleToggle}
                >
                    <Text style={styles.buttonText}>
                        {currentTask.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
        fontWeight: '500',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 24,
        lineHeight: 30,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#666',
        fontSize: 16,
    },
});

export default DetailScreen;
