import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StyleStatics from '../../../../../StyleStatics'
import RequestListElement from '../RequestListElement'

export default function NonPending({ nonPendingRequests, tabNavigator }) {
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
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            fontSize: 20,
            width: 330,
            textAlign: 'center',
            backgroundColor: StyleStatics.white,
            padding: 15,
            borderRadius: 16,
        },

        infoBox: {
            width: 330,
            height: "50%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },

        infoBoxText: {
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.lightText,
            fontSize: 18,
            marginTop: 20,
        },

        infoBoxTextSend: {
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.white,
            fontSize: 14,
            marginTop: 5,
            backgroundColor: StyleStatics.primary,
            padding: 12,
            borderRadius: 12,
            width: 160,
        }
    })

    return (
        <View>
            <View style={styles.view}>
                { nonPendingRequests.length > 0 ? 
                    nonPendingRequests.map( (e,idx) => (
                        <RequestListElement key={idx} title={e.name} org={e.orgName} status={e.status}/>
                    ) )
                : 
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>Nie masz żadnych nieoczekujących próśb</Text>
                        {/* <Text onPress={ () => tabNavigator.navigate("GroupRequestForm") } style={styles.infoBoxTextSend}>Wyślij prośbę</Text> */}
                    </View>
                }
            </View>
        </View>
    )
}