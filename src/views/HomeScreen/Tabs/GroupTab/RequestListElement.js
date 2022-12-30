import { View, Text, StyleSheet } from 'react-native'
import StyleStatics from '../../../../StyleStatics';

export default function RequestListElement({ title, org, status }) {
    const statusStyles = {
        status: {
            fontFamily: 'Poppins-Bold',
        },
        accepted: {
            color: StyleStatics.success,
        },

        pending: {
            color: StyleStatics.warning,
        },

        denied: {
            color: StyleStatics.error,
        }
    }
    
    const statusTranslate = ( status ) => {
        const translations = {
            'ACCEPTED': <Text style={[statusStyles.status, statusStyles.accepted]}>Zaakceptowano</Text>,
            'DENIED': <Text style={[statusStyles.status, statusStyles.denied]}>Odrzucono</Text>,
            'PENDING': <Text style={[statusStyles.status, statusStyles.pending]}>Oczekuje</Text>,
        }

        const def = <Text>???</Text>;

        return translations[status] ? translations[status] : def 
    }

    const styles = StyleSheet.create({
        view: {
            marginTop: 10,
            width: 330,
            backgroundColor: StyleStatics.white,
            padding: 15,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        
        name: {
            fontFamily: 'Poppins-Bold',
        },

        orgName: {
            marginTop: -5,
            fontFamily: 'Poppins-Medium',
        },

        textBox: {

        },

        statusBox: {

        }
    })
    return (
        <View style={styles.view}>
            <View style={styles.textBox}>
                <Text numberOfLines={1} style={styles.name}>{title}</Text>
                <Text numberOfLines={1} style={styles.orgName}>{org}</Text>
            </View>
            <View style={styles.statusBox}>
            { statusTranslate(status) }
            </View>
        </View>
    )
}