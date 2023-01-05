import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import grouprequest from '../../../../api/grouprequest'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from './GroupRequests/Pending'
import NonPending from './GroupRequests/NonPending'

const Tab = createMaterialTopTabNavigator();

export default function GroupRequests({ navigation }) {
    const [ pendingRequests, setPendingRequests ] = useState([])
    const [ nonPendingRequests, setNonPendingRequests ] = useState([])

    useEffect(()=>{
        const loadRequests = async () => {
            try {
                const result = await grouprequest.fetchList();
                setNonPendingRequests( result.filter( request => request.status != 'PENDING' ) )
                setPendingRequests( result.filter( request => request.status == 'PENDING' ) )
            } catch ( err ) {
                alert(err)
            }
        }
        loadRequests()
    },[])

    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: 'Poppins'
                }
            }}>
            <Tab.Screen options={{ tabBarLabel: "Oczekujące" }} name="Pending">
                { props => <Pending {...props} tabNavigator={navigation} pendingRequests={pendingRequests} /> }
            </Tab.Screen>
            <Tab.Screen options={{ tabBarLabel: "Starsze prośby" }} name="NonPending" >
                { props => <NonPending {...props} tabNavigator={navigation} nonPendingRequests={nonPendingRequests} /> }
            </Tab.Screen>
        </Tab.Navigator>
    )
} 