import { View, Text, StyleSheet } from 'react-native'
import AnimatedTab from '../AnimatedTab';
import { useState } from 'react'
import StyleStatics from '../../../../StyleStatics';
import WButton from '../../../../components/WButton';

export default function GroupTab({navigation}) {

    const [ groups, setGroups ] = useState([]); 

    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        message: {
            textAlign: 'center',
            fontFamily: 'Poppins',
            color: StyleStatics.disabled,
            fontSize:  20,
        },

        messageHref: {
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.primary,
            fontSize:  20,
        },
        messageBox: {
            height: "85%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        listBox: {
            height: "85%",
            display: 'flex',
            alignItems: 'center',
        }
    })

    return (
        <AnimatedTab navigation={navigation}>
            <View style={styles.view}>
                { groups.length > 0 ?
                    <View style={styles.listBox}>

                    </View>
                :
                    <View style={styles.messageBox}>
                        <Text style={styles.message}>
                        Wygląda na to że nie {'\n'}
                        należysz jeszcze do {'\n'}
                        żadnego wolontariatu....
                        </Text>
                        <Text style={styles.messageHref}>
                        Znajdź wolontariat
                        </Text>
                    </View>
                }
                <WButton 
                    onClick={()=>navigation.navigate("GroupRequests")} 
                    label="Zgłaszanie wolontariatu" 
                    baseColor={StyleStatics.white} 
                    labelColor={StyleStatics.primary} 
                />
            </View>
        </AnimatedTab>
    )
}