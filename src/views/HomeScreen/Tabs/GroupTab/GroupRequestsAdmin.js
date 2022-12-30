import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import StyleStatics from "../../../../StyleStatics"
import RequestListElement from './RequestListElement'
import grouprequest from '../../../../api/grouprequest'

export default function Pending({ }) {
    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        sectionLabel: {
            marginTop: 16,
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.darkText,
            fontSize: 20,
            width: 330,
            textAlign: 'center',
            backgroundColor: 'transparent',
            padding: 15,
            borderRadius: 16,
        },
    })

    const [ pendingRequests, setPendingRequests ] = useState([])

    useEffect(()=>{
        const loadRequests = async () => {
            try {
                const result = await grouprequest.fetchPending();
                setPendingRequests( result )
            } catch ( err ) {
                alert(err)
            }
            
            
        }
        loadRequests()
    },[])

    return (
        <View>
            <View style={styles.view}>
                <Text style={styles.sectionLabel}> Prośby do zweryfikowania </Text>
                { pendingRequests.length > 0 ? 
                    pendingRequests.map( (e,idx) => (
                        <RequestListElement key={idx} title={e.name} org={e.orgName} status={e.status}/>
                    ) )
                : ''}
            </View>
        </View>
    )
} 