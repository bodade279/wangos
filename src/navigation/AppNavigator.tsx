import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#f5f5f5' },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{
                        headerShown: true,
                        title: 'Task Details',
                        headerBackTitle: 'Back',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
