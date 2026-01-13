import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchTasks } from '../api/api';
import { Task, RootStackParamList } from '../types';
import { saveTasksToStorage, getTasksFromStorage } from '../utils/storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'All' | 'Completed' | 'Incomplete'>('All');

    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          
            const storedTasks = await getTasksFromStorage();
            if (storedTasks && storedTasks.length > 0) {
                setTasks(storedTasks);
            }

           
            const apiTasks = await fetchTasks();
           
            if (!storedTasks || storedTasks.length === 0) {
                setTasks(apiTasks);
                saveTasksToStorage(apiTasks);
            } else {
               
            }

          
            if (!storedTasks) {
                setTasks(apiTasks);
                saveTasksToStorage(apiTasks);
            }
        } catch (err) {
           
            const storedTasks = await getTasksFromStorage();
            if (!storedTasks || storedTasks.length === 0) {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const forceRefresh = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiTasks = await fetchTasks();
            setTasks(apiTasks);
            saveTasksToStorage(apiTasks);
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const toggleTaskCompletion = (id: number) => {
        const newTasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        setTasks(newTasks);
        saveTasksToStorage(newTasks);
    };

    const getFilteredTasks = () => {
        switch (filter) {
            case 'Completed':
                return tasks.filter(t => t.completed);
            case 'Incomplete':
                return tasks.filter(t => !t.completed);
            default:
                return tasks;
        }
    };

    const renderItem = ({ item }: { item: Task }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { task: item, toggleTaskCompletion })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={[
                    styles.status,
                    { color: item.completed ? '#4CAF50' : '#F44336' }
                ]}>
                    {item.completed ? '✓ Completed' : '✗ Incomplete'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading && tasks.length === 0) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10 }}>Loading Tasks...</Text>
            </View>
        );
    }

    if (error && tasks.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadTasks}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Task Explorer</Text>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContentContainer}
                >
                    {(['All', 'Completed', 'Incomplete'] as const).map((f) => (
                        <TouchableOpacity
                            key={f}
                            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
                            onPress={() => setFilter(f)}
                        >
                            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={getFilteredTasks()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={forceRefresh} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    filterContainer: {
        marginVertical: 15,
        height: 50,
    },
    filterContentContainer: {
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        backgroundColor: '#fff',
    },
    filterButtonActive: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    filterText: {
        color: '#666',
        fontWeight: '600',
    },
    filterTextActive: {
        color: '#fff',
    },
    listContent: {
        padding: 15,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: '#F44336',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
