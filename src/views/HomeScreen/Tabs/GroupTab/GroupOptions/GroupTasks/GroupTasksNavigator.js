import { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


export default function GropupTasksNavigator({}) {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: 'Poppins'
                }
            }}>
            <Tab.Screen options={{ tabBarLabel: "Oczekujące" }} name="GroupTasks">
                { props => <Pending {...props} tabNavigator={navigation} pendingRequests={pendingRequests} /> }
            </Tab.Screen>
            <Tab.Screen options={{ tabBarLabel: "Oczekujące na potwierdzenie" }} name="PendingTaks" >
                { props => <NonPending {...props} tabNavigator={navigation} nonPendingRequests={nonPendingRequests} /> }
            </Tab.Screen>
        </Tab.Navigator>
    )
}

